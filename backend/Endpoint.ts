import mongoose, { Schema, Document } from 'mongoose';

export interface IEndpoint extends Document {
  name: string;
  url: string;
  method: string;
  frequency: number;
  status: 'active' | 'paused';
  lastRun?: Date;
  userId: string;
  healthStatus?: 'UP' | 'DOWN';
  latency?: number;
}

const EndpointSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, required: true },
  frequency: { type: Number, required: true },
  status: { type: String, enum: ['active', 'paused'], default: 'active' },
  lastRun: { type: Date },
  userId: { type: String, required: true },
  healthStatus: { type: String, enum: ['UP', 'DOWN'], default: 'UP' },
  latency: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IEndpoint>('Endpoint', EndpointSchema);