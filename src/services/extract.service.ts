import { Injectable, NotFoundException } from '@nestjs/common';
import { Pool as PostgresSql } from 'pg';
import { Client, Transaction } from 'src/models';
import { ExtractDTO } from 'src/models';

@Injectable()
export class ExtractService {
  constructor(private readonly database: PostgresSql) {}

  async getExtractClient(clientId: number): Promise<ExtractDTO.Response> {
    const {
      rows: [customer],
    } = await this.database.query<Client.Model>(
      `
        SELECT c.id, c.name, c.account_limit, s.balance AS balance
        FROM customers c
        INNER JOIN balances s ON c.id = s.customer_id
        WHERE c.id = $1
      `,
      [clientId],
    );

    if (!customer) throw new NotFoundException('Client not found');

    const { rows: transactions } = await this.database.query<Transaction.Model>(
      `
        SELECT
          amount,
          type,
          description,
          created_at
        FROM transactions
        WHERE customer_id = $1
        ORDER BY created_at DESC
        LIMIT 10
        `,
      [clientId],
    );

    return {
      saldo: {
        total: customer.balance,
        data_extrato: new Date().toISOString(),
        limite: customer.account_limit,
      },
      ultimas_transacoes: transactions.map((trx) => ({
        valor: trx.amount,
        tipo: trx.type,
        descricao: trx.description,
        realizada_em: trx.created_at,
      })),
    };
  }
}
