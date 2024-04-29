import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoLoja } from 'src/entidades/produtoloja.entity';
import { ProdutoLojaDto } from 'src/dto/produtoLoja.dto';

@Injectable()
export class ProdutoLojaService {
    constructor(
        @InjectRepository(ProdutoLoja)
        private produtoLojaRepository: Repository<ProdutoLoja>
    ) {}

    async findAll(): Promise<ProdutoLoja[]> {
        return await this.produtoLojaRepository.find();
    }

    async findById(id: number): Promise<ProdutoLoja> {
        const produtoLoja = await this.findById(id);
        if (!produtoLoja) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado na loja.`);
        }
        return produtoLoja;
    }

    async findByProductId(id: string): Promise<ProdutoLoja[]> {
        const queryBuilder = this.produtoLojaRepository.createQueryBuilder('produtoLoja');

        queryBuilder
        .leftJoinAndSelect('produtoLoja.loja', 'loja')
        .where('produtoLoja.idProduto = :id', { id });

        console.log(await queryBuilder.getMany());

        return await queryBuilder.getMany();
    }

    async create(produtoLojaDto: ProdutoLojaDto): Promise<ProdutoLoja> {
        const produtoLoja = new ProdutoLoja();
        return await this.produtoLojaRepository.save(produtoLoja);
    }

    async update(id: number, produtoDto: ProdutoLojaDto): Promise<ProdutoLoja> {
        const produtoLoja = await this.findById(id);
        Object.assign(produtoLoja, produtoDto);
        return await this.produtoLojaRepository.save(produtoLoja);
    }

    async remove(id: number): Promise<void> {
        const produtoLoja = await this.findById(id);
        await this.produtoLojaRepository.remove(produtoLoja);
    }
}