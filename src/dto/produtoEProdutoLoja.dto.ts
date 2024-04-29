export class ProdutoEProdutoLojaDto {
    id?: number;
    descricao?: string;
    custo?: number;
    imagem?: Buffer;
    lojas: LojasArr[]
}

interface LojasArr {
    idLoja?: number;
    precoVenda?: string;
    descricao?: string;
}