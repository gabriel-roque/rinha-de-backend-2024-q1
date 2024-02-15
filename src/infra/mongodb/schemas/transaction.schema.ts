import { Transaction } from '@domain/models';
import { HydratedDocument, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

const transactionSchema = new Schema<Transaction.Model>(
  {
    id: {
      type: 'string',
      required: true,
      default: () => uuid(),
      index: 'hashed',
      select: false,
    },
    valor: { type: 'number', required: true },
    tipo: { type: 'string', required: true },
    descricao: { type: 'string', required: true },
    realizada_em: { type: 'string', required: true },
  },
  { versionKey: false },
);

transactionSchema.set('toJSON', {
  virtuals: true,
  transform(_doc: HydratedDocument<unknown>, ret: Record<string, any>) {
    delete ret._id;
    delete ret.id;
  },
});

export { transactionSchema };
