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
exports.LojaController = void 0;
const common_1 = require("@nestjs/common");
const loja_service_1 = require("../services/loja.service");
const loja_dto_1 = require("../dto/loja.dto");
let LojaController = class LojaController {
    constructor(lojaService) {
        this.lojaService = lojaService;
    }
    async findAll() {
        return this.lojaService.findAll();
    }
    async findById(id) {
        return this.lojaService.findById(id);
    }
    async create(lojaDto) {
        return this.lojaService.create(lojaDto);
    }
    update(id, lojaDto) {
        return this.lojaService.update(id, lojaDto);
    }
    remove(id) {
        return this.lojaService.remove(id);
    }
};
exports.LojaController = LojaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LojaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LojaController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loja_dto_1.LojaDto]),
    __metadata("design:returntype", Promise)
], LojaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, loja_dto_1.LojaDto]),
    __metadata("design:returntype", void 0)
], LojaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LojaController.prototype, "remove", null);
exports.LojaController = LojaController = __decorate([
    (0, common_1.Controller)('loja'),
    __metadata("design:paramtypes", [loja_service_1.LojaService])
], LojaController);
//# sourceMappingURL=loja.controller.js.map