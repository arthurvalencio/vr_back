import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from './produto.entity';
import { Loja } from './loja.entity';

@Entity({ name: 'produtoLoja' })
export class ProdutoLoja {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produto, produto => produto.lojas)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;

  @ManyToOne(() => Loja, loja => loja.produtos)
  @JoinColumn({ name: 'idLoja' })
  loja: Loja;

  @Column('numeric', { precision: 13, scale: 3, nullable: false })
  precoVenda: number;
}