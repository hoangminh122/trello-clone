import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LooseObject } from "src/shared/interfaces/loose-object.interface";
import { paginate } from "src/shared/paginate/paginate";
import { UnitOfWork } from "../database/UnitOfWork";
import { CreateLabelDto } from "./dto/label-create.input";
import { FilterLabelDto } from "./dto/filter-label.input";
import { Label } from "src/entities/label";

@Injectable()
export class LabelService {
    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
        @InjectModel(Label)
        private labelModel: typeof Label
    )
    {  }

    async addLabel(labelDto:CreateLabelDto)
    {
        return await (await this.labelModel.create(labelDto));
    }

    async updateLabel(labelDto:CreateLabelDto,id)
    {
         await this.unitOfWork.scope(async transaction => {
            const cardDto = await this.labelModel.findOne({
              where: { id },
              transaction
            });
            if (!cardDto) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: ' Label not exists',
                },
                HttpStatus.BAD_REQUEST,
              );
            }
            await this.labelModel.update(cardDto, {
              where: { id },
              transaction,
            });
            return true;
          });
          return true;
    }

    async getAll(labelQuery: FilterLabelDto )
    {
        var filter :LooseObject = {};
        if(labelQuery.name)
        {
          filter.name = labelQuery.name;
        }
       
        const options = { page: labelQuery.page, limit: labelQuery.limit };
        const searchOptions = {
          where: filter,
        };
        
        return paginate(this.labelModel, options,searchOptions);
    }

    async deleteLabel(id: string) {
      return this.unitOfWork.scope(async transaction => {
        await this.labelModel.destroy({ where: { id }, transaction });
        return true;
      });
    }
}