import { Repository } from 'typeorm';
import { Loja } from 'src/entidades/loja.entity';
import { LojaDto } from 'src/dto/loja.dto';
export declare class LojaService {
    private lojaRepository;
    constructor(lojaRepository: Repository<Loja>);
    findAll(): Promise<Loja[]>;
    findById(id: number): Promise<Loja>;
    create(lojaDto: LojaDto): Promise<Loja>;
    update(id: number, lojaDto: LojaDto): Promise<Loja>;
    remove(id: number): Promise<void>;
}
