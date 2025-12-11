import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToysService {
  constructor(private db: PrismaService) {}
  create(createToyDto: CreateToyDto) {
    try {
      return this.db.toy.create({
      data: createToyDto,
      });
    } catch {
      throw new BadRequestException('Not acceptable form');
    }
  }

  findAll() {
    return this.db.toy.findMany();
  }

  async findOne(id: number) {
    const toy = await this.db.toy.findUnique({
      where: { toyid: id },
    });

    if (!toy) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    }

    return toy;
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    await this.findOne(id);
    try {
      return await this.db.toy.update({
        where: { toyid: id },
        data: updateToyDto,
      });
    } catch {
      throw new BadRequestException('Not acceptable form');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.db.toy.delete({
      where: { toyid: id },
    });
  }
}
