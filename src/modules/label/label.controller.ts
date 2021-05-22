import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilterLabelDto } from "./dto/filter-label.input";
import { CreateLabelDto } from "./dto/label-create.input";
import { LabelService } from "./label.service";

@Controller('label')
@ApiTags('label')
export class LabelController {
    constructor(
        private readonly labelService:LabelService
    )
    { }

    @Post('')
    async createLabel(@Body() labelDto: CreateLabelDto){
       return await this.labelService.addLabel(labelDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update label' })
    async updateLabel(@Body() labelDto: CreateLabelDto,@Query('id') id:string){
        return await this.labelService.updateLabel(labelDto,id);
    }

    @Get('/')
    async getAll(@Query() query: FilterLabelDto)
    {
        return await this.labelService.getAll(query);
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete card' })
    async deleteLabel(@Param('id') id: string) {
      const result = await this.labelService.deleteLabel(id);
      return { success: result };
    }

}