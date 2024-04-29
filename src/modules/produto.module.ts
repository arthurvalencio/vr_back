import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../entidades/produto.entity';
import { ProdutoController } from '../controllers/produto.controller';
import { ProdutoService } from '../services/produto.service';
import { ProdutoLoja } from 'src/entidades/produtoloja.entity';
import { Loja } from 'src/entidades/loja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, ProdutoLoja, Loja])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}