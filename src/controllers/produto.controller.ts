import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entidades/produto.entity';
import { ProdutoDto } from 'src/dto/produto.dto';
import { ProdutoEProdutoLojaDto } from 'src/dto/produtoEProdutoLoja.dto';

interface ProdutoFilter {
  codigo?: string;
  descricao?: string;
  custo?: string;
  preco?: string;
}

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async findAll(@Query() filter?: ProdutoFilter): Promise<Produto[]> {
    return this.produtoService.findAll(filter);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Post()
  async create(@Body() produtoDto: ProdutoEProdutoLojaDto): Promise<Produto> {
    return this.produtoService.create(produtoDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() produtoDto: ProdutoDto) {
    return this.produtoService.update(id, produtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(id);
  }
}