import { Repository } from 'typeorm';
import { ProdutoLoja } from 'src/entidades/produtoloja.entity';
import { ProdutoLojaDto } from 'src/dto/produtoLoja.dto';
export declare class ProdutoLojaService {
    private produtoLojaRepository;
    constructor(produtoLojaRepository: Repository<ProdutoLoja>);
    findAll(): Promise<ProdutoLoja[]>;
    findById(id: number): Promise<ProdutoLoja>;
    findByProductId(id: string): Promise<ProdutoLoja[]>;
    create(produtoLojaDto: ProdutoLojaDto): Promise<ProdutoLoja>;
    update(id: number, produtoDto: ProdutoLojaDto): Promise<ProdutoLoja>;
    remove(id: number): Promise<void>;
}
