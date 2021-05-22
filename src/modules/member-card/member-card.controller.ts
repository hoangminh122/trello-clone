import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilterMemberCardDto } from "./dto/filter-member-card.input";
import { CreateMemberCardDto } from "./dto/member-card-create.input";
import {  MemberCardService } from "./member-card.service";

@Controller('member-card')
@ApiTags('member-card')
export class MemberCardController {
    constructor(
        private readonly memberCardService:MemberCardService
    )
    { }

    @Post('')
    async createMemberCard(@Body() listCardDto: CreateMemberCardDto){
       return await this.memberCardService.addMemberCard(listCardDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update member card' })
    async updateMemberCard(@Body() listCardDto: CreateMemberCardDto,@Query('id') id:string){
        return await this.memberCardService.updateMemberCard(listCardDto,id);
    }

   // @UsePipes(new ValidationPipe({ transform: true }))
    @Get('/')
    async getAll(@Query() query: FilterMemberCardDto)
    {
        return await this.memberCardService.getAll(query);
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete member card' })
    async deleteMemberCard(@Param('id') id: string) {
      const result = await this.memberCardService.deleteMemberCard(id);
      return { success: result };
    }

}