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
export declare class ProdutoController {
    private readonly produtoService;
    constructor(produtoService: ProdutoService);
    findAll(filter?: ProdutoFilter): Promise<Produto[]>;
    findById(id: string): Promise<Produto>;
    create(produtoDto: ProdutoEProdutoLojaDto): Promise<Produto>;
    update(id: string, produtoDto: ProdutoDto): Promise<Produto>;
    remove(id: string): Promise<void>;
}
export {};
