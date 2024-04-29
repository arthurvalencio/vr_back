import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loja } from 'src/entidades/loja.entity';
import { LojaDto } from 'src/dto/loja.dto';

@Injectable()
export class LojaService {
    constructor (
        @InjectRepository(Loja)
        private lojaRepository: Repository<Loja>
    ) {}

    async findAll(): Promise<Loja[]> {
        return await this.lojaRepository.find();
    }

    async findById(id: number): Promise<Loja> {
        const loja = await this.findById(id);
        if (!loja) {
            throw new NotFoundException(`Loja com ID ${id} não encontrado.`);
        }
        return loja;
    }

    async create(lojaDto: LojaDto): Promise<Loja> {
        const loja = new Loja();
        loja.descricao = lojaDto.descricao;
        return await this.lojaRepository.save(loja);
    }

    async update(id: number, lojaDto: LojaDto): Promise<Loja> {
        const loja = await this.findById(id);
        Object.assign(loja, lojaDto);
        return await this.lojaRepository.save(loja);
    }

    async remove(id: number): Promise<void> {
        const produto = await this.findById(id);
        await this.lojaRepository.remove(produto);
    }
}