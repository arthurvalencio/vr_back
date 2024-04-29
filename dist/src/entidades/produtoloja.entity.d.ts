import { Produto } from './produto.entity';
import { Loja } from './loja.entity';
export declare class ProdutoLoja {
    id: number;
    produto: Produto;
    loja: Loja;
    precoVenda: number;
}
