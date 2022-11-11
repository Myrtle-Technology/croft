import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { FyleModule } from './fyle/fyle.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AccountGuard } from './account/account.guard';

@Module({
  imports: [
    AccountModule,
    FyleModule,
    MongooseModule.forRoot('mongodb://localhost/croft'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccountGuard,
    },
  ],
})
export class AppModule {}
