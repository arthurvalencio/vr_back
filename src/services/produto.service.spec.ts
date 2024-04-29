import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';
import { Repository } from 'typeorm';
import { Produto } from '../entidades/produto.entity';
import { NotFoundException } from '@nestjs/common';
import { ProdutoLoja } from '../entidades/produtoloja.entity';
import { Loja } from '../entidades/loja.entity';
import { ProdutoEProdutoLojaDto } from 'src/dto/produtoEProdutoLoja.dto';

const mockProdutoRepository = {
    find: jest.fn(),
    findBy: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      andWhere: jest.fn(),
      leftJoinAndSelect: jest.fn(),
      getMany: jest.fn(),
    })),
  };
  
  const mockProdutoLojaRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    findBy: jest.fn(),
  };
  
  const mockLojaRepository = {
    findOneBy: jest.fn(),
  };

describe('ProdutoService', () => {
  let service: ProdutoService;
  let produtoRepository: Repository<Produto>;
  let produtoLojaRepository: Repository<ProdutoLoja>;
  let lojaRepository: Repository<Loja>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            ProdutoService,
            {
                provide: getRepositoryToken(Produto),
                useValue: mockProdutoRepository
            },
            {
                provide: getRepositoryToken(ProdutoLoja),
                useValue: mockProdutoLojaRepository
            },
            {
                provide: getRepositoryToken(Loja),
                useValue: mockLojaRepository
            },
        ],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
    produtoRepository = module.get<Repository<Produto>>(
        getRepositoryToken(Produto),
    );
    produtoLojaRepository = module.get<Repository<ProdutoLoja>>(
        getRepositoryToken(ProdutoLoja),
    );
    lojaRepository = module.get<Repository<Loja>>(
        getRepositoryToken(Loja),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all produtos', async () => {
      const produtos: Produto[] = [{ id: 1, descricao: 'Produto 1', custo: 10, imagem: '', lojas: [] }];
      const mockQueryBuilder = {
        getMany: jest.fn().mockResolvedValue(produtos)
      }
      jest.spyOn(produtoRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder as any);
      expect(await service.findAll({})).toEqual(produtos);
    });

    it('should return filtered produtos by desc', async () => {
      const produtos: Produto[] = [{ id: 1, descricao: 'Produto 1', custo: 10, imagem: '', lojas: [] }];
      const mockQueryBuilder = {
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn().mockResolvedValue(produtos)
      }
      jest.spyOn(produtoRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder as any);
      expect(await service.findAll({ descricao: 'Produto 1' })).toEqual(
        produtos,
      );
    });

    it('should return filtered produtos by id', async () => {
        const produtos: Produto[] = [{ id: 1, descricao: 'Produto 1', custo: 10, imagem: '', lojas: [] }];
        const mockQueryBuilder = {
          andWhere: jest.fn(),
          leftJoinAndSelect: jest.fn(),
          getMany: jest.fn().mockResolvedValue(produtos)
        }
        jest.spyOn(produtoRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder as any);
        expect(await service.findAll({ codigo: '1' })).toEqual(
          produtos,
        );
    });

    it('should return filtered produtos by custo', async () => {
        const produtos: Produto[] = [{ id: 1, descricao: 'Produto 1', custo: 10, imagem: '', lojas: [] }];
        const mockQueryBuilder = {
          andWhere: jest.fn(),
          leftJoinAndSelect: jest.fn(),
          getMany: jest.fn().mockResolvedValue(produtos)
        }
        jest.spyOn(produtoRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder as any);
        expect(await service.findAll({ custo: '10' })).toEqual(
          produtos,
        );
    });

    it('should return filtered produtos by preco', async () => {
        const produtos: Produto[] = [{ id: 1, descricao: 'Produto 1', custo: 10, imagem: '', lojas: [{id: 1, produto: new Produto(), loja: new Loja(), precoVenda: 10}] }];
        const mockQueryBuilder = {
          andWhere: jest.fn(),
          leftJoinAndSelect: jest.fn(),
          getMany: jest.fn().mockResolvedValue(produtos)
        }
        jest.spyOn(produtoRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder as any);
        expect(await service.findAll({ preco: '1' })).toEqual(
          produtos,
        );
    });
  });

  describe('findById', () => {
    it('should return produto with given id', async () => {
      const produto = { id: 1, descricao: 'Produto 1', custo: 10, imagem: '', lojas: [] };
      jest.spyOn(produtoRepository, 'findOneBy').mockResolvedValue(produto);
      expect(await service.findById('1')).toEqual(produto);
    });

    it('should throw NotFoundException if produto is not found', async () => {
      jest.spyOn(produtoRepository, 'findOneBy').mockResolvedValue(null);
      await expect(service.findById('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a produto', async () => {
        const id = '1';
        const existingProduto: Produto = { id: 1, descricao: 'Produto Antigo', custo: 10.0, imagem: '', lojas: [] };
        const updatedDto = { descricao: 'Produto Novo', custo: 15.0, imagem: '' };

        jest.spyOn(produtoRepository, 'findOneBy').mockResolvedValue(existingProduto);
        jest.spyOn(produtoRepository, 'save').mockReturnValue(updatedDto as any);

        const updatedProduto = await service.update(id, updatedDto);

        expect(produtoRepository.findOneBy).toHaveBeenCalledWith({ id: parseInt(id) });
        expect(produtoRepository.save).toHaveBeenCalledWith(existingProduto);
        expect(updatedProduto.descricao).toEqual(updatedDto.descricao);
        expect(updatedProduto.custo).toEqual(updatedDto.custo);
    });

    it('should throw an error if produto is not found', async () => {
        const id = '999';
        const updatedDto = { descricao: 'Produto Novo', custo: 15.0, imagem: '' };

        jest.spyOn(produtoRepository, 'findOneBy').mockResolvedValue(null);
        await expect(service.update(id, updatedDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a produto', async () => {
        const id = '1';
        const produto = { id: 1, descricao: 'Produto 1', custo: 10.0, imagem: '', lojas: [] };

        jest.spyOn(produtoRepository, 'findOneBy').mockResolvedValue(produto);
        jest.spyOn(produtoRepository, 'remove').mockImplementation();

        await service.remove(id);

        expect(produtoRepository.findOneBy).toHaveBeenCalledWith({ id: parseInt(id) });
        expect(produtoRepository.remove).toHaveBeenCalledWith(produto);
    });

    it('should throw an error if produto is not found', async () => {
        const id = '999';

        jest.spyOn(produtoRepository, 'findOneBy').mockResolvedValue(null);

        await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {

    it('should create a new produto with lojas', async () => {
        const idLoja1 = '1';
        const produtoDto: ProdutoEProdutoLojaDto = {
          descricao: 'Novo Produto',
          custo: 15.0,
          lojas: [
            { idLoja: parseInt(idLoja1), precoVenda: '10.0' }
          ],
        };
        const produto = { id: 1, descricao: 'Novo Produto', custo: 15.0, imagem: '', lojas: [] };
      
        jest.spyOn(produtoRepository, 'save').mockResolvedValue(produto);
        jest.spyOn(lojaRepository, 'findOneBy').mockResolvedValue({ id: idLoja1, nome: 'Loja 1' } as any);
        jest.spyOn(produtoLojaRepository, 'save').mockImplementation();
      
        const novoProduto = await service.create(produtoDto);
      
        expect(produtoRepository.save).toHaveBeenCalled();
        expect(lojaRepository.findOneBy).toHaveBeenCalledTimes(1);
        expect(produtoLojaRepository.save).toHaveBeenCalledTimes(1);
        expect(produtoLojaRepository.remove).not.toHaveBeenCalled();
        expect(novoProduto.descricao).toEqual(produtoDto.descricao);
        expect(novoProduto.custo).toEqual(produtoDto.custo);
    });

    it('should update an existing produto with lojas', async () => {
        const idProduto = 1;
        const idLoja1 = '1';
        const produtoDto: ProdutoEProdutoLojaDto = {
          id: idProduto,
          descricao: 'Produto Atualizado',
          custo: 20.0,
          lojas: [
            { idLoja: parseInt(idLoja1), precoVenda: '12.0' }
          ],
        };
      
        const produto = { id: idProduto, descricao: 'Produto Existente', custo: 15.0, imagem: '', lojas: [] };
        const produtoLojas = [{ id: 1, produto: produto, loja: { id: idLoja1 }, precoVenda: 10.0 }];
      
        jest.spyOn(produtoRepository, 'findOneBy').mockResolvedValue(produto);
        jest.spyOn(produtoRepository, 'save').mockResolvedValue(produto);
        jest.spyOn(produtoLojaRepository, 'findBy').mockResolvedValue(produtoLojas as any);
        jest.spyOn(produtoLojaRepository, 'remove').mockImplementation();
        jest.spyOn(produtoLojaRepository, 'save').mockImplementation();
      
        const novoProduto = await service.create(produtoDto);
      
        expect(produtoRepository.findOneBy).toHaveBeenCalledWith({ id: idProduto });
        expect(produtoRepository.save).toHaveBeenCalledWith(produto);
        expect(produtoLojaRepository.findBy).toHaveBeenCalledWith({ produto: produto });
        expect(produtoLojaRepository.remove).toHaveBeenCalledWith(produtoLojas);
        expect(novoProduto.id).toEqual(idProduto);
        expect(novoProduto.descricao).toEqual(produtoDto.descricao);
        expect(novoProduto.custo).toEqual(produtoDto.custo);
      });

  });
});