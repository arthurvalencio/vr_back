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
exports.ProdutoLojaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const produtoloja_entity_1 = require("../entidades/produtoloja.entity");
let ProdutoLojaService = class ProdutoLojaService {
    constructor(produtoLojaRepository) {
        this.produtoLojaRepository = produtoLojaRepository;
    }
    async findAll() {
        return await this.produtoLojaRepository.find();
    }
    async findById(id) {
        const produtoLoja = await this.findById(id);
        if (!produtoLoja) {
            throw new common_1.NotFoundException(`Produto com ID ${id} não encontrado na loja.`);
        }
        return produtoLoja;
    }
    async findByProductId(id) {
        const queryBuilder = this.produtoLojaRepository.createQueryBuilder('produtoLoja');
        queryBuilder
            .leftJoinAndSelect('produtoLoja.loja', 'loja')
            .where('produtoLoja.idProduto = :id', { id });
        console.log(await queryBuilder.getMany());
        return await queryBuilder.getMany();
    }
    async create(produtoLojaDto) {
        const produtoLoja = new produtoloja_entity_1.ProdutoLoja();
        return await this.produtoLojaRepository.save(produtoLoja);
    }
    async update(id, produtoDto) {
        const produtoLoja = await this.findById(id);
        Object.assign(produtoLoja, produtoDto);
        return await this.produtoLojaRepository.save(produtoLoja);
    }
    async remove(id) {
        const produtoLoja = await this.findById(id);
        await this.produtoLojaRepository.remove(produtoLoja);
    }
};
exports.ProdutoLojaService = ProdutoLojaService;
exports.ProdutoLojaService = ProdutoLojaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(produtoloja_entity_1.ProdutoLoja)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProdutoLojaService);
//# sourceMappingURL=produtoLoja.service.js.map