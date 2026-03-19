import { Pool } from 'pg';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
const region = 'us-east-1';
const secretsClient = new SecretsManagerClient({ region });
const ssmClient = new SSMClient({ region });
async function getSecret(secretName) {
    const response = await secretsClient.send(new GetSecretValueCommand({ SecretId: secretName }));
    return JSON.parse(response.SecretString);
}
async function getParameter(name) {
    const response = await ssmClient.send(new GetParameterCommand({ Name: name }));
    return response.Parameter?.Value;
}
async function createPool() {
    const [secret, host, port, database] = await Promise.all([
        getSecret('requestbin/postgres'),
        getParameter('/requestbin/postgres/host'),
        getParameter('/requestbin/postgres/port'),
        getParameter('/requestbin/postgres/dbname'),
    ]);
    return new Pool({
        host,
        port: parseInt(port),
        database,
        user: secret.username,
        password: secret.password,
        ssl: { rejectUnauthorized: false },
    });
}
export const pool = await createPool();
const statements = [
    `CREATE EXTENSION IF NOT EXISTS pgcrypto;`,
    `CREATE TABLE IF NOT EXISTS master_tokens (
      id SERIAL PRIMARY KEY,
      token UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL
  );`,
    `CREATE TABLE IF NOT EXISTS baskets (
      id SERIAL PRIMARY KEY,
      endpoint CHAR(7) UNIQUE NOT NULL,
      config_response JSONB NOT NULL,
      master_token_id INTEGER NOT NULL REFERENCES master_tokens(id) ON DELETE CASCADE,
      CONSTRAINT endpoint_alphanumeric CHECK (endpoint ~ '^[A-Za-z0-9]{7}$')
  );`,
    `CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    basket_id INTEGER NOT NULL REFERENCES baskets(id) ON DELETE CASCADE,
    method VARCHAR(10) NOT NULL,
    headers JSONB NOT NULL,
    request_date DATE NOT NULL,
    request_time TIME NOT NULL,
    mongodb_id VARCHAR(255) UNIQUE
  );`
];
const migrations = [
    `ALTER TABLE requests ALTER COLUMN mongodb_id DROP NOT NULL;`,
    `ALTER TABLE baskets
   ADD CONSTRAINT baskets_endpoint_key UNIQUE (endpoint);`
];
// Function to initialize tables
export async function initializeSchema() {
    console.log(`Creating tables...`);
    for (const statement of statements) {
        try {
            await pool.query(statement);
        }
        catch (err) {
            console.error(`Error creating one or more tables`, err);
        }
    }
    for (const migration of migrations) {
        try {
            await pool.query(migration);
        }
        catch (err) {
            // Ignore duplicate-constraint creation when the unique key already exists.
            if (err?.code !== '42P07') {
                console.error(`Error applying schema migration`, err);
            }
        }
    }
    console.log('Database schema initialized.');
}
// To auto generate our master tokens
export async function generateMasterToken() {
    const res = await pool.query(`INSERT INTO master_tokens DEFAULT VALUES RETURNING *;`);
    const row = res.rows[0];
    if (!row) {
        throw new Error("generateMasterToken() failed; no row returned");
    }
    return row;
}
//# sourceMappingURL=psql_schema.js.map