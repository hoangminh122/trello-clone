import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Card } from "src/entities/Card";
import { LooseObject } from "src/shared/interfaces/loose-object.interface";
import { paginate } from "src/shared/paginate/paginate";
import { UnitOfWork } from "../database/UnitOfWork";
import { CreateCardDto } from "./dto/card-create.input";
import { FilterCardDto } from "./dto/filter-card.input";

@Injectable()
export class CardService {
    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
        @InjectModel(Card)
        private cardModel: typeof Card
    )
    {  }

    async addCard(cardDto:CreateCardDto)
    {
        return await (await this.cardModel.create(cardDto));
    }

    async updateCard(cardDto:CreateCardDto,id)
    {
         await this.unitOfWork.scope(async transaction => {
            const cardDto = await this.cardModel.findOne({
              where: { id },
              transaction
            });
            if (!cardDto) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: ' Card not exists',
                },
                HttpStatus.BAD_REQUEST,
              );
            }
            await this.cardModel.update(cardDto, {
              where: { id },
              transaction,
            });
            return true;
          });
          return true;
    }

    async getAll(cardQuery: FilterCardDto )
    {
        var filter :LooseObject = {};
        if(cardQuery.name)
        {
          filter.name = cardQuery.name;
        }
       
        const options = { page: cardQuery.page, limit: cardQuery.limit };
        const searchOptions = {
          where: filter,
        };
        
        return paginate(this.cardModel, options,searchOptions);
    }

    async deleteCard(id: string) {
      return this.unitOfWork.scope(async transaction => {
        await this.cardModel.destroy({ where: { id }, transaction });
        return true;
      });
    }
}