/// <reference types="node" />
export declare class ProdutoEProdutoLojaDto {
    id?: number;
    descricao?: string;
    custo?: number;
    imagem?: Buffer;
    lojas: LojasArr[];
}
interface LojasArr {
    idLoja?: number;
    precoVenda?: string;
    descricao?: string;
}
export {};
