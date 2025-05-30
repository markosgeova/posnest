import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.findAndCount({
      order: { name: 'ASC' },
      select: ['id', 'name']
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    // Verificar que existe
    await this.findOne(id);
    
    // Actualizar
    await this.categoryRepository.update(id, updateCategoryDto);
    
    // Devolver la categoría actualizada
    return this.findOne(id);
  }

  async remove(id: number) {
    // Verificar que existe
    const category = await this.findOne(id);
    
    // Eliminar
    await this.categoryRepository.remove(category);
    
    return { message: `Category with id ${id} has been removed` };
  }
}