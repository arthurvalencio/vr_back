import { Repository } from 'typeorm';
import { Produto } from '../entidades/produto.entity';
import { ProdutoDto } from 'src/dto/produto.dto';
import { ProdutoLoja } from 'src/entidades/produtoloja.entity';
import { ProdutoEProdutoLojaDto } from 'src/dto/produtoEProdutoLoja.dto';
import { Loja } from 'src/entidades/loja.entity';
interface ProdutoFilter {
    codigo?: string;
    descricao?: string;
    custo?: string;
    preco?: string;
}
export declare class ProdutoService {
    private produtoRepository;
    private produtoLojaRepository;
    private lojaRepository;
    constructor(produtoRepository: Repository<Produto>, produtoLojaRepository: Repository<ProdutoLoja>, lojaRepository: Repository<Loja>);
    findAll(filter?: ProdutoFilter): Promise<Produto[]>;
    findById(id: string): Promise<Produto>;
    create(produtoDto: ProdutoEProdutoLojaDto): Promise<Produto>;
    update(id: string, produtoDto: ProdutoDto): Promise<Produto>;
    remove(id: string): Promise<void>;
}
export {};
