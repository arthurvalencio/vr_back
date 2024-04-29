import { LojaService } from 'src/services/loja.service';
import { Loja } from 'src/entidades/loja.entity';
import { LojaDto } from 'src/dto/loja.dto';
export declare class LojaController {
    private readonly lojaService;
    constructor(lojaService: LojaService);
    findAll(): Promise<Loja[]>;
    findById(id: number): Promise<Loja>;
    create(lojaDto: LojaDto): Promise<Loja>;
    update(id: number, lojaDto: LojaDto): Promise<Loja>;
    remove(id: number): Promise<void>;
}
