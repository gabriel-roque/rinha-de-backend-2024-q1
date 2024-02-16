import { Client } from '@domain/models';
import { HydratedDocument, Schema } from 'mongoose';

const clientSchema = new Schema<Client.Model>(
  {
    id: { type: 'number', required: true, index: 'hashed' },
    limite: { type: 'number', required: true },
    saldo: { type: 'number', required: true },
  },
  { versionKey: false },
);

clientSchema.set('toJSON', {
  virtuals: true,
  transform(_doc: HydratedDocument<unknown>, ret: Record<string, any>) {
    delete ret._id;
  },
});

export { clientSchema };
