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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoLoja = void 0;
const typeorm_1 = require("typeorm");
const produto_entity_1 = require("./produto.entity");
const loja_entity_1 = require("./loja.entity");
let ProdutoLoja = class ProdutoLoja {
};
exports.ProdutoLoja = ProdutoLoja;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProdutoLoja.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_entity_1.Produto, produto => produto.lojas),
    (0, typeorm_1.JoinColumn)({ name: 'idProduto' }),
    __metadata("design:type", produto_entity_1.Produto)
], ProdutoLoja.prototype, "produto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => loja_entity_1.Loja, loja => loja.produtos),
    (0, typeorm_1.JoinColumn)({ name: 'idLoja' }),
    __metadata("design:type", loja_entity_1.Loja)
], ProdutoLoja.prototype, "loja", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 13, scale: 3, nullable: false }),
    __metadata("design:type", Number)
], ProdutoLoja.prototype, "precoVenda", void 0);
exports.ProdutoLoja = ProdutoLoja = __decorate([
    (0, typeorm_1.Entity)({ name: 'produtoLoja' })
], ProdutoLoja);
//# sourceMappingURL=produtoloja.entity.js.map