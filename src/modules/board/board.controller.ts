import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/board-create.input";
import { FilterBoardDto } from "./dto/filter-board.input";

@Controller('board')
@ApiTags('board')
export class BoardController {
    constructor(
        private readonly boardService:BoardService
    )
    { }

    @Post('')
    async createBoard(@Body() boardDto: CreateBoardDto){
       return await this.boardService.addBoard(boardDto);
    }

    @Put(':id')
    async updateBoard(@Body() boardDto: CreateBoardDto,@Query('id') id:string){
        return await this.boardService.updateBoard(boardDto,id);
    }

   // @UsePipes(new ValidationPipe({ transform: true }))
    @Get('/')
    async getAll(@Query() query: FilterBoardDto)
    {
        console.log("asdasd" + query);
        return await this.boardService.getAll(query);
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete Board' })
    async deleteComment(@Param('id') id: string) {
      const result = await this.boardService.deleteBoard(id);
      return { success: result };
    }

}