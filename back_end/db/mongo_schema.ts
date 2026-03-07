import mongoose, { Document, Schema, Types } from 'mongoose';

const mongourl = process.env.MONGODB_URI as string; //this will definitely exist in .env

await mongoose.connect(mongourl);

export interface RequestBodyDocument extends Document {
  requestPayload: Record<string, any>;
}

const requestBodySchema = new mongoose.Schema<RequestBodyDocument>({
  requestPayload: {
    type: Schema.Types.Mixed,
    required: true
  }
})

requestBodySchema.set("toJSON", {
  transform: (_, returnedObj) => {

    const obj = returnedObj as any; // temporary
    obj.id = returnedObj._id.toString();
    delete obj._id;
    delete obj.__v;

    return obj;
  }
})

export const mongoExecutor = mongoose.model("RequestBody", requestBodySchema);