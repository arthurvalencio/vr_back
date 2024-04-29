import { ProdutoLojaService } from 'src/services/produtoLoja.service';
import { ProdutoLoja } from 'src/entidades/produtoloja.entity';
import { ProdutoLojaDto } from 'src/dto/produtoLoja.dto';
export declare class ProdutoLojaController {
    private readonly produtoLojaService;
    constructor(produtoLojaService: ProdutoLojaService);
    findAll(): Promise<ProdutoLoja[]>;
    findById(id: number): Promise<ProdutoLoja>;
    findByProductId(id: string): Promise<ProdutoLoja[]>;
    create(produtoLojaDto: ProdutoLojaDto): Promise<ProdutoLoja>;
    update(id: number, produtoLojaDto: ProdutoLojaDto): Promise<ProdutoLoja>;
    remove(id: number): Promise<void>;
}
