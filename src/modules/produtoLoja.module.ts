import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoLoja } from '../entidades/produtoloja.entity';
import { ProdutoLojaController } from '../controllers/produtoLoja.controller';
import { ProdutoLojaService } from '../services/produtoLoja.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProdutoLoja])],
    controllers: [ProdutoLojaController],
    providers: [ProdutoLojaService],
})
export class ProdutoLojaModule {}