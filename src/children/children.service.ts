import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { tr } from '@faker-js/faker';

@Injectable()
export class ChildrenService {
  constructor(private db: PrismaService) {}
  create(createChildDto: CreateChildDto) {
    try {
      return this.db.child.create({
      data: createChildDto,
      });
    } catch {
      throw new BadRequestException('Not acceptable form');
    }
  }

  findAll() {
    return this.db.child.findMany();
  }

  async findOne(id: number) {
    const child = await this.db.child.findUnique({
      where: { childid: id },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }

    return child;
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    await this.findOne(id);
    try {
      return await this.db.child.update({
        where: { childid: id },
        data: updateChildDto,
      });
    } catch {
      throw new BadRequestException('Not acceptable form');
    }
  }

  async addToyToChild(childid: number, toyid: number) {
    await this.findOne(childid);
    const toy = await this.db.toy.findUnique({ where: { toyid: toyid } });
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${toyid} not found`);
    }
    await this.db.child.update({
      where: {
        childid: childid,
      },
      data: {
        toys: {
          connect: {
            toyid: toyid,
          },
        },
      },
    });
    return "Toy added to child successfully";
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.db.child.delete({
      where: { childid: id },
    });
  }

  async removeToyFromChild(childid: number, toyid: number) {
    try {
      await this.db.child.update({
      where: {
        childid: childid,
      },
      data: {
        toys: {
          disconnect: {
            toyid: toyid,
          },
        },
      },
    });
    return "Toy removed from child successfully";
    } catch {
      throw new NotFoundException('Not found');
    }
  }
}
