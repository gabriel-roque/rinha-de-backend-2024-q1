import {
  HttpException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Pool as PostgresSql } from 'pg';
import { Balance, Transaction, TransactionDTO } from 'src/models';

@Injectable()
export class TransactionService {
  constructor(private readonly database: PostgresSql) {}

  async createTransaction(
    clientId: number,
    transaction: TransactionDTO.Request,
  ): Promise<TransactionDTO.Response> {
    const db = await this.database.connect();

    try {
      await db.query('BEGIN');

      const {
        rows: [balanceComputed],
      } = await db.query<Balance.Model>(
        `
          SELECT b.id, b.client_id, b.balance, c.client_limit
          FROM balances b
          INNER JOIN clients c ON b.client_id = c.id
          WHERE client_id = $1
          FOR UPDATE
          `,
        [clientId],
      );

      if (!balanceComputed) throw new NotFoundException('client not found');

      let balance = balanceComputed.balance;

      if (transaction.tipo === Transaction.Type.CREDIT)
        balance += transaction.valor;
      if (transaction.tipo === Transaction.Type.DEBIT)
        balance -= transaction.valor;

      if (balanceComputed?.client_limit + balance < 0) {
        throw new UnprocessableEntityException('client not have limit');
      }

      await db.query(
        `UPDATE balances
         SET balance = $1 WHERE client_id = $2`,
        [balance, clientId],
      );

      await db.query(
        `INSERT INTO transactions (client_id, amount, type, description, created_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          clientId,
          transaction.valor,
          transaction.tipo,
          transaction.descricao,
          new Date(),
        ],
      );

      await db.query('COMMIT');

      return {
        limite: balanceComputed.client_limit,
        saldo: balance,
      };
    } catch (error) {
      await db.query('ROLLBACK');

      if (error instanceof HttpException) throw error;

      throw error;
    } finally {
      db.release();
    }
  }
}
