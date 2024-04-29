import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entidades/produto.entity';
import { ProdutoDto } from 'src/dto/produto.dto';
import { ProdutoLoja } from '../entidades/produtoloja.entity';
import { ProdutoEProdutoLojaDto } from 'src/dto/produtoEProdutoLoja.dto';
import { Loja } from '../entidades/loja.entity';

interface ProdutoFilter {
  codigo?: string;
  descricao?: string;
  custo?: string;
  preco?: string;
}

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(ProdutoLoja)
    private produtoLojaRepository: Repository<ProdutoLoja>,
    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>
  ) {}

  async findAll(filter?: ProdutoFilter): Promise<Produto[]> {
    const queryBuilder = this.produtoRepository.createQueryBuilder('produto');

    var retorno;

    if (filter.codigo) {
      queryBuilder.andWhere('produto.id::text LIKE :codigo', { codigo: `%${filter.codigo}%` })
    }
    if (filter.descricao) {
      queryBuilder.andWhere('LOWER(produto.descricao) LIKE LOWER(:descricao)', { descricao: `%${filter.descricao}%` })
    }
    if (filter.custo) {
      queryBuilder.andWhere('produto.custo::text LIKE :custo', { custo: `%${filter.custo}%` })
    }
    if (filter.preco) {
      queryBuilder.leftJoinAndSelect('produto.lojas', 'produtoloja');
    }

    retorno = await queryBuilder.getMany();

    if (filter.preco) {
      retorno = retorno.filter(elem => elem.lojas.some(loja => loja.precoVenda.toString().includes(filter.preco.toString())));
    }

    return retorno;
  }

  async findById(id: string): Promise<Produto> {
    const produto = await this.produtoRepository.findOneBy({
        id: parseInt(id)
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return produto;
  }

  async create(produtoDto: ProdutoEProdutoLojaDto): Promise<Produto> {
    if (!produtoDto.id) {
      const produto = new Produto();
      produto.descricao = produtoDto.descricao;
      produto.custo = produtoDto.custo;
      
      const novoProduto = await this.produtoRepository.save(produto);

      for (const lojaData of produtoDto.lojas) {

        const loja = await this.lojaRepository.findOneBy({
          id: lojaData.idLoja
        });

        if (!loja) {
          throw new NotFoundException(`Loja com o ID ${lojaData.idLoja} não encontrada.`);
        }

        const produtoLoja = new ProdutoLoja();
        produtoLoja.produto = novoProduto;
        produtoLoja.loja = loja;
        produtoLoja.precoVenda = parseFloat(lojaData.precoVenda);

        await this.produtoLojaRepository.save(produtoLoja);
      }

      return novoProduto;
    } else {
      const produto = await this.produtoRepository.findOneBy({
        id: produtoDto.id
      });
      produto.descricao = produtoDto.descricao;
      produto.custo = produtoDto.custo;
      
      await this.produtoRepository.save(produto);

      if (produtoDto.lojas.length >= 1) {

        const produtoLojas = await this.produtoLojaRepository.findBy({
          produto: produto
        })

        await this.produtoLojaRepository.remove(produtoLojas);

        for (const lojaData of produtoDto.lojas) {

          const loja = await this.lojaRepository.findOneBy({
            id: lojaData.idLoja
          });
  
          if (!loja) {
            throw new NotFoundException(`Loja com o ID ${lojaData.idLoja} não encontrada.`);
          }
  
          const produtoLoja = new ProdutoLoja();
          produtoLoja.produto = produto;
          produtoLoja.loja = loja;
          produtoLoja.precoVenda = parseFloat(lojaData.precoVenda);
  
          await this.produtoLojaRepository.save(produtoLoja);
        }
      }

      return produto;
    }
  }

  async update(id: string, produtoDto: ProdutoDto): Promise<Produto> {
    const produto = await this.produtoRepository.findOneBy({
        id: parseInt(id)
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    Object.assign(produto, produtoDto);
    return await this.produtoRepository.save(produto);
  }

  async remove(id: string): Promise<void> {
    const produto = await this.produtoRepository.findOneBy({
        id: parseInt(id)
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    await this.produtoRepository.remove(produto);
  }
}