import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ExtractService } from 'src/services';
import { ExtractDTO } from 'src/models';

@Controller('clientes')
export class ExtractController {
  constructor(private readonly extractService: ExtractService) {}

  @Get(':id/extrato')
  async getExtract(
    @Param('id', ParseIntPipe) clientId: number,
  ): Promise<ExtractDTO.Response> {
    return this.extractService.getExtractClient(clientId);
  }
}
