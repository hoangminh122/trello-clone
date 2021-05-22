import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ChecklistService } from "./checklist.service";
import { CreateChecklistDto } from "./dto/checklist-create.input";
import { FilterChecklistDto } from "./dto/filter-checklist.input";

@Controller('checklist')
@ApiTags('checklist')
export class ChecklistController {
    constructor(
        private readonly checklistService:ChecklistService
    )
    { }

    @Post('')
    async createChecklist(@Body() checklistDto: CreateChecklistDto){
       return await this.checklistService.addChecklist(checklistDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update checklist' })
    async updateChecklist(@Body() checklistDto: CreateChecklistDto,@Query('id') id:string){
        return await this.checklistService.updateChecklist(checklistDto,id);
    }

    @Get('/')
    async getAll(@Query() query: FilterChecklistDto)
    {
        return await this.checklistService.getAll(query);
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete card' })
    async deleteChecklist(@Param('id') id: string) {
      const result = await this.checklistService.deleteChecklist(id);
      return { success: result };
    }

}