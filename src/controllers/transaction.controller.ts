import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { TransactionDTO } from 'src/models';
import { TransactionService } from 'src/services';

@Controller('clientes')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':id/transacoes')
  @HttpCode(HttpStatus.OK)
  async createTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: TransactionDTO.Request,
  ): Promise<TransactionDTO.Response> {
    return this.transactionService.createTransaction(id, body);
  }
}
