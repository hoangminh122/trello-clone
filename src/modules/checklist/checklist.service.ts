import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LooseObject } from "src/shared/interfaces/loose-object.interface";
import { paginate } from "src/shared/paginate/paginate";
import { UnitOfWork } from "../database/UnitOfWork";
import { Checklist } from "src/entities/checklist";
import { CreateChecklistDto } from "./dto/checklist-create.input";
import { FilterChecklistDto } from "./dto/filter-checklist.input";
import { Item } from "src/entities/item";

@Injectable()
export class ChecklistService {
    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
        @InjectModel(Checklist)
        private checklistModel: typeof Checklist
    )
    {  }

    async addChecklist(checklistDto:CreateChecklistDto)
    {
        return await (await this.checklistModel.create(checklistDto));
    }

    async updateChecklist(itemDto:CreateChecklistDto,id)
    {
         await this.unitOfWork.scope(async transaction => {
            const checklist = await this.checklistModel.findOne({
              where: { id },
              transaction
            });
            if (!checklist) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: ' Label not exists',
                },
                HttpStatus.BAD_REQUEST,
              );
            }
            await this.checklistModel.update(itemDto, {
              where: { id },
              transaction,
            });
            return true;
          });
          return true;
    }

    async getAll(checklistQuery: FilterChecklistDto )
    {
        var filter :LooseObject = {};
        if(checklistQuery.name)
        {
          filter.name = checklistQuery.name;
        }
       
        const options = { page: checklistQuery.page, limit: checklistQuery.limit };
        const searchOptions = {
          where: filter,
          include: [
            {
              model: Item,
              as: 'items'
            },
          ],
        };
        
        return paginate(this.checklistModel, options,searchOptions);
    }

    async deleteChecklist(id: string) {
      return this.unitOfWork.scope(async transaction => {
        await this.checklistModel.destroy({ where: { id }, transaction });
        return true;
      });
    }
}