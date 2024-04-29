import { ProdutoLoja } from './produtoloja.entity';
export declare class Produto {
    id: number;
    descricao: string;
    custo: number;
    imagem: string;
    lojas: ProdutoLoja[];
}
