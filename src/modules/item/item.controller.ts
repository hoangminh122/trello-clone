import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilterItemDto } from "./dto/filter-item.input";
import { CreateItemDto } from "./dto/item-create.input";
import { ItemService } from "./item.service";

@Controller('item')
@ApiTags('item')
export class ItemController {
    constructor(
        private readonly labelService:ItemService
    )
    { }

    @Post('')
    async createItem(@Body() itemDto: CreateItemDto){
       return await this.labelService.addItem(itemDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update item' })
    async updateItem(@Body() labelDto: CreateItemDto,@Query('id') id:string){
        return await this.labelService.updateItem(labelDto,id);
    }

    @Get('/')
    async getAll(@Query() query: FilterItemDto)
    {
        return await this.labelService.getAll(query);
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete card' })
    async deleteItem(@Param('id') id: string) {
      const result = await this.labelService.deleteItem(id);
      return { success: result };
    }

}