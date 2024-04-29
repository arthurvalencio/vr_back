"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const produto_entity_1 = require("../entidades/produto.entity");
const produtoloja_entity_1 = require("../entidades/produtoloja.entity");
const loja_entity_1 = require("../entidades/loja.entity");
let ProdutoService = class ProdutoService {
    constructor(produtoRepository, produtoLojaRepository, lojaRepository) {
        this.produtoRepository = produtoRepository;
        this.produtoLojaRepository = produtoLojaRepository;
        this.lojaRepository = lojaRepository;
    }
    async findAll(filter) {
        const queryBuilder = this.produtoRepository.createQueryBuilder('produto');
        var retorno;
        if (filter.codigo) {
            queryBuilder.andWhere('produto.id::text LIKE :codigo', { codigo: `%${filter.codigo}%` });
        }
        if (filter.descricao) {
            queryBuilder.andWhere('LOWER(produto.descricao) LIKE LOWER(:descricao)', { descricao: `%${filter.descricao}%` });
        }
        if (filter.custo) {
            queryBuilder.andWhere('produto.custo::text LIKE :custo', { custo: `%${filter.custo}%` });
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
    async findById(id) {
        const produto = await this.produtoRepository.findOneBy({
            id: parseInt(id)
        });
        if (!produto) {
            throw new common_1.NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
        return produto;
    }
    async create(produtoDto) {
        if (!produtoDto.id) {
            const produto = new produto_entity_1.Produto();
            produto.descricao = produtoDto.descricao;
            produto.custo = produtoDto.custo;
            const novoProduto = await this.produtoRepository.save(produto);
            for (const lojaData of produtoDto.lojas) {
                const loja = await this.lojaRepository.findOneBy({
                    id: lojaData.idLoja
                });
                if (!loja) {
                    throw new Error(`Loja com o ID ${lojaData.idLoja} não encontrada.`);
                }
                const produtoLoja = new produtoloja_entity_1.ProdutoLoja();
                produtoLoja.produto = novoProduto;
                produtoLoja.loja = loja;
                produtoLoja.precoVenda = parseFloat(lojaData.precoVenda);
                await this.produtoLojaRepository.save(produtoLoja);
            }
            return novoProduto;
        }
        else {
            const produto = await this.produtoRepository.findOneBy({
                id: produtoDto.id
            });
            produto.descricao = produtoDto.descricao;
            produto.custo = produtoDto.custo;
            await this.produtoRepository.save(produto);
            if (produtoDto.lojas.length >= 1) {
                const produtoLojas = await this.produtoLojaRepository.findBy({
                    produto: produto
                });
                await this.produtoLojaRepository.remove(produtoLojas);
                for (const lojaData of produtoDto.lojas) {
                    const loja = await this.lojaRepository.findOneBy({
                        id: lojaData.idLoja
                    });
                    if (!loja) {
                        throw new Error(`Loja com o ID ${lojaData.idLoja} não encontrada.`);
                    }
                    const produtoLoja = new produtoloja_entity_1.ProdutoLoja();
                    produtoLoja.produto = produto;
                    produtoLoja.loja = loja;
                    produtoLoja.precoVenda = parseFloat(lojaData.precoVenda);
                    await this.produtoLojaRepository.save(produtoLoja);
                }
            }
            return produto;
        }
    }
    async update(id, produtoDto) {
        const produto = await this.produtoRepository.findOneBy({
            id: parseInt(id)
        });
        Object.assign(produto, produtoDto);
        return await this.produtoRepository.save(produto);
    }
    async remove(id) {
        const produto = await this.produtoRepository.findOneBy({
            id: parseInt(id)
        });
        await this.produtoRepository.remove(produto);
    }
};
exports.ProdutoService = ProdutoService;
exports.ProdutoService = ProdutoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(produto_entity_1.Produto)),
    __param(1, (0, typeorm_1.InjectRepository)(produtoloja_entity_1.ProdutoLoja)),
    __param(2, (0, typeorm_1.InjectRepository)(loja_entity_1.Loja)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProdutoService);
//# sourceMappingURL=produto.service.js.map