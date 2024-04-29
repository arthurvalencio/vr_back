import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { LojaService } from 'src/services/loja.service';
import { Loja } from 'src/entidades/loja.entity';
import { LojaDto } from 'src/dto/loja.dto';

@Controller('loja')
export class LojaController {
    constructor(private readonly lojaService: LojaService) {}

    @Get()
    async findAll(): Promise<Loja[]> {
        return this.lojaService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Loja> {
        return this.lojaService.findById(id);
    }

    @Post()
    async create(@Body() lojaDto: LojaDto): Promise<Loja> {
        return this.lojaService.create(lojaDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() lojaDto: LojaDto) {
        return this.lojaService.update(id, lojaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.lojaService.remove(id);
    }
}