import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';

import { ExtractService, TransactionService } from './services';
import { ExtractController, TransactionController } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ExtractController, TransactionController],
  providers: [
    ExtractService,
    TransactionService,
    {
      provide: Pool,
      useFactory: () =>
        new Pool({ connectionString: process.env.DATABASE_URL }),
    },
  ],
})
export class AppModule {}
