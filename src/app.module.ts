import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { ProdutoModule } from './modules/produto.module';
import { LojaModule } from './modules/loja.module';
import { ProdutoLojaModule } from './modules/produtoLoja.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ProdutoModule,
    LojaModule,
    ProdutoLojaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
