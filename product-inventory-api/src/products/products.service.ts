import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './entities/products.entity'; // <-- Changed to Product
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>, // <-- Changed to Product
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productRepo.create(dto);
    const savedProduct = await this.productRepo.save(product);
    return { message: 'Product created successfully', data: savedProduct };
  }

  async findAll() {
    const products = await this.productRepo.find({ order: { createdAt: 'DESC' } });
    return { message: 'All products fetched', count: products.length, data: products };
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return { message: 'Product fetched', data: product };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    await this.findOne(id); // Ensure it exists first
    await this.productRepo.update(id, dto);
    const updated = await this.productRepo.findOne({ where: { id } });
    return { message: 'Product updated', data: updated };
  }

  async replace(id: number, dto: UpdateProductDto) {
    await this.findOne(id); // Ensure it exists first
    await this.productRepo.update(id, dto);
    const updated = await this.productRepo.findOne({ where: { id } });
    return { message: 'Product replaced', data: updated };
  }

  async remove(id: number) {
    const product = await this.findOne(id); // Ensure it exists first
    await this.productRepo.delete(id);
    return { message: 'Product deleted', id: product.data.id };
  }

  async findByCategory(category: string) {
    const products = await this.productRepo.find({ where: { category } });
    return { message: `Products in category: ${category}`, count: products.length, data: products };
  }

  async search(keyword: string) {
    const products = await this.productRepo.find({
      where: { name: ILike(`%${keyword}%`) },
    });
    return { message: `Search results for: ${keyword}`, count: products.length, data: products };
  }

  async toggleActive(id: number) {
    const productResponse = await this.findOne(id);
    const product = productResponse.data;
    product.isActive = !product.isActive;
    const saved = await this.productRepo.save(product);
    return { message: 'Product active status toggled', data: saved };
  }
}