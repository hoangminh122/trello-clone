import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilterListDto } from "./dto/filter-list-card.input";
import { CreateListCardDto } from "./dto/list-card-create.input";
import { ListCardDto } from "./dto/list-card.dto";
import { ListCardService } from "./list.service";

@Controller('list-card')
@ApiTags('list-card')
export class ListCardController {
    constructor(
        private readonly listCardService:ListCardService
    )
    { }

    @Post('')
    async createBoard(@Body() listCardDto: CreateListCardDto){
       return await this.listCardService.addListCard(listCardDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update list card' })
    async updateBoard(@Body() listCardDto: CreateListCardDto,@Query('id') id:string){
        return await this.listCardService.updateListCard(listCardDto,id);
    }

   // @UsePipes(new ValidationPipe({ transform: true }))
    @Get('/')
    async getAll(@Query() query: FilterListDto)
    {
        console.log("asdasd" + query);
        return await this.listCardService.getAll(query);
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete list card' })
    async deleteComment(@Param('id') id: string) {
      const result = await this.listCardService.deleteListCard(id);
      return { success: result };
    }

}