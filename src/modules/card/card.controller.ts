import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/card-create.input";
import { UpdateCardDto } from "./dto/card-update.input";
import { FilterCardDto } from "./dto/filter-card.input";

@Controller('card')
@ApiTags('card')
export class CardController {
    constructor(
        private readonly cardService:CardService
    )
    { }

    @Post('')
    async createCard(@Body() cardDto: CreateCardDto){
       return await this.cardService.addCard(cardDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update card' })
    async updateCard(@Body() cardDto: UpdateCardDto,@Query('id') id:string){
        return await this.cardService.updateCard(cardDto,id);
    }

    @Get('/')
    async getAll(@Query() query: FilterCardDto)
    {
        return await this.cardService.getAll(query);
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete card' })
    async deleteCard(@Param('id') id: string) {
      const result = await this.cardService.deleteCard(id);
      return { success: result };
    }

}