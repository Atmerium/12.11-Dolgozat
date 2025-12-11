import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childrenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childrenService.update(+id, updateChildDto);
  }

  @Put(':childid/toys/:toyid')
  addToyToChild(@Param('childid') childid: string, @Param('toyid') toyid: string) {
    return this.childrenService.addToyToChild(+childid, +toyid);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childrenService.remove(+id);
  }

  @Delete(':childid/toys/:toyid')
  removeToyFromChild(@Param('childid') childid: string, @Param('toyid') toyid: string) {
    return this.childrenService.removeToyFromChild(+childid, +toyid);
  }
}
