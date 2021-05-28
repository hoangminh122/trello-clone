import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LooseObject } from "src/shared/interfaces/loose-object.interface";
import { paginate } from "src/shared/paginate/paginate";
import { UnitOfWork } from "../database/UnitOfWork";
import { CreateItemDto } from "./dto/item-create.input";
import { Item } from '../../entities/Item';
import { FilterItemDto } from "./dto/filter-item.input";

@Injectable()
export class ItemService {
    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
        @InjectModel(Item)
        private itemModel: typeof Item
    )
    {  }

    async addItem(itemDto:CreateItemDto)
    {
        return await (await this.itemModel.create(itemDto));
    }

    async updateItem(itemDto:CreateItemDto,id)
    {
         await this.unitOfWork.scope(async transaction => {
            const item = await this.itemModel.findOne({
              where: { id },
              transaction
            });
            if (!item) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: ' Label not exists',
                },
                HttpStatus.BAD_REQUEST,
              );
            }
            await this.itemModel.update(itemDto, {
              where: { id },
              transaction,
            });
            return true;
          });
          return true;
    }

    async getAll(itemQuery: FilterItemDto )
    {
        var filter :LooseObject = {};
        if(itemQuery.name)
        {
          filter.name = itemQuery.name;
        }
       
        const options = { page: itemQuery.page, limit: itemQuery.limit };
        const searchOptions = {
          where: filter,
        };
        
        return paginate(this.itemModel, options,searchOptions);
    }

    async deleteItem(id: string) {
      return this.unitOfWork.scope(async transaction => {
        await this.itemModel.destroy({ where: { id }, transaction });
        return true;
      });
    }
}