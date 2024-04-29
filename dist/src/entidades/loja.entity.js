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
exports.Loja = void 0;
const typeorm_1 = require("typeorm");
const produtoloja_entity_1 = require("./produtoloja.entity");
let Loja = class Loja {
};
exports.Loja = Loja;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Loja.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60, nullable: false }),
    __metadata("design:type", String)
], Loja.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => produtoloja_entity_1.ProdutoLoja, produtoLoja => produtoLoja.loja),
    __metadata("design:type", Array)
], Loja.prototype, "produtos", void 0);
exports.Loja = Loja = __decorate([
    (0, typeorm_1.Entity)()
], Loja);
//# sourceMappingURL=loja.entity.js.map