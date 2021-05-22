import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { List } from "src/entities/List";
import { LooseObject } from "src/shared/interfaces/loose-object.interface";
import { paginate } from "src/shared/paginate/paginate";
import { UnitOfWork } from "../database/UnitOfWork";
import { FilterListDto } from "./dto/filter-list-card.input";
import { CreateListCardDto } from "./dto/list-card-create.input";

@Injectable()
export class ListCardService {
    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
        @InjectModel(List)
        private listCardModel: typeof List
    )
    {  }

    async addListCard(listCardDto:CreateListCardDto)
    {
        return await (await this.listCardModel.create(listCardDto));
    }

    async updateListCard(listCardDto:CreateListCardDto,id)
    {
         await this.unitOfWork.scope(async transaction => {
            const listCard = await this.listCardModel.findOne({
              where: { id },
              transaction
            });
            if (!listCard) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: 'List Card not exists',
                },
                HttpStatus.BAD_REQUEST,
              );
            }
            await this.listCardModel.update(listCardDto, {
              where: { id },
              transaction,
            });
            return true;
          });
          return true;
    }

    async getAll(listQuery: FilterListDto )
    {
        // var result =  await this.boardModel.findAll({
        //     order: [
        //     ['order', 'DESC'],
        // ]
        // });

        var filter :LooseObject = {};
       
        const options = { page: listQuery.page, limit: listQuery.limit };
        const searchOptions = {
          where: filter,
        };
        
        return paginate(this.listCardModel, options,searchOptions);
    }

    async deleteListCard(id: string) {
      return this.unitOfWork.scope(async transaction => {
        await this.listCardModel.destroy({ where: { id }, transaction });
        return true;
      });
    }
}