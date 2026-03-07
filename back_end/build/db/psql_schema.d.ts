import { Pool } from 'pg';
export declare const pool: Pool;
export declare function initializeSchema(): Promise<void>;
interface master_token_object {
    id: number;
    master_token: string;
}
export declare function generateMasterToken(): Promise<master_token_object>;
export {};
//# sourceMappingURL=psql_schema.d.ts.map