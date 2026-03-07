import mongoose, { Document, Types } from 'mongoose';
export interface RequestBodyDocument extends Document {
    requestPayload: Record<string, any>;
}
export declare const mongoExecutor: mongoose.Model<RequestBodyDocument, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, RequestBodyDocument, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<RequestBodyDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<RequestBodyDocument, mongoose.Model<RequestBodyDocument, any, any, any, (mongoose.Document<unknown, any, RequestBodyDocument, any, mongoose.DefaultSchemaOptions> & RequestBodyDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, RequestBodyDocument, any, mongoose.DefaultSchemaOptions> & RequestBodyDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}), any, RequestBodyDocument>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RequestBodyDocument, mongoose.Document<unknown, {}, RequestBodyDocument, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<RequestBodyDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<Types.ObjectId, RequestBodyDocument, mongoose.Document<unknown, {}, RequestBodyDocument, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<RequestBodyDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    requestPayload?: mongoose.SchemaDefinitionProperty<Record<string, any>, RequestBodyDocument, mongoose.Document<unknown, {}, RequestBodyDocument, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<RequestBodyDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, RequestBodyDocument>, RequestBodyDocument>;
//# sourceMappingURL=mongo_schema.d.ts.map