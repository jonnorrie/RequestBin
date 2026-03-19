import mongoose, { Document, Schema, Types } from 'mongoose';
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
const [secret, host, port] = await Promise.all([
    getSecret('requestbin/documentdb'),
    getParameter('/requestbin/docdb/host'),
    getParameter('/requestbin/docdb/port'),
]);
const mongourl = `mongodb://${secret.username}:${encodeURIComponent(secret.password)}@${host}:${port}/?tls=true&tlsCAFile=/home/ssm-user/RequestBin/back_end/global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&authMechanism=SCRAM-SHA-1`;
await mongoose.connect(mongourl);
const requestBodySchema = new mongoose.Schema({
    requestPayload: {
        type: Schema.Types.Mixed,
        required: true
    }
});
// strips MongoDB internals (_id, __v) and renames _id to id before the document is sent to the client
requestBodySchema.set("toJSON", {
    transform: (_, returnedObj) => {
        const obj = returnedObj; // temporary
        obj.id = returnedObj._id.toString();
        delete obj._id;
        delete obj.__v;
        return obj;
    }
});
export const mongoExecutor = mongoose.model("RequestBody", requestBodySchema);
//# sourceMappingURL=mongo_schema.js.map