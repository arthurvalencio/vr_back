import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ProdutoLojaService } from 'src/services/produtoLoja.service';
import { ProdutoLoja } from 'src/entidades/produtoloja.entity';
import { ProdutoLojaDto } from 'src/dto/produtoLoja.dto';

@Controller('produtoloja')
export class ProdutoLojaController {
    constructor(private readonly produtoLojaService: ProdutoLojaService) {}

    @Get()
    async findAll(): Promise<ProdutoLoja[]> {
        return this.produtoLojaService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<ProdutoLoja> {
        return this.produtoLojaService.findById(id);
    }

    @Get('produtoid/:id')
    async findByProductId(@Param('id') id: string): Promise<ProdutoLoja[]> {
        return this.produtoLojaService.findByProductId(id);
    }

    @Post()
    async create(@Body() produtoLojaDto: ProdutoLojaDto): Promise<ProdutoLoja> {
        return this.produtoLojaService.create(produtoLojaDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() produtoLojaDto: ProdutoLojaDto) {
        return this.produtoLojaService.update(id, produtoLojaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.produtoLojaService.remove(id);
    }
}