import { Module, OnModuleInit } from '@nestjs/common';
import { ExchangeController } from './exchange/exchange.controller';
import { ExchangeService } from './exchange/exchange.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {

  }
}
