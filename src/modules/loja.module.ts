import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from '../entidades/loja.entity';
import { LojaController } from '../controllers/loja.controller';
import { LojaService } from '../services/loja.service';

@Module({
    imports: [TypeOrmModule.forFeature([Loja])],
    controllers: [LojaController],
    providers: [LojaService],
})
export class LojaModule {}