import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { List } from "src/entities/List";
import { MemberCard } from "src/entities/MemberCard";
import { LooseObject } from "src/shared/interfaces/loose-object.interface";
import { paginate } from "src/shared/paginate/paginate";
import { UnitOfWork } from "../database/UnitOfWork";
import { FilterMemberCardDto } from "./dto/filter-member-card.input";
import { CreateMemberCardDto } from "./dto/member-card-create.input";

@Injectable()
export class MemberCardService {
    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
        @InjectModel(MemberCard)
        private memberCardModel: typeof MemberCard
    )
    {  }

    async addMemberCard(memberCardDto:CreateMemberCardDto)
    {
        return await (await this.memberCardModel.create(memberCardDto));
    }

    async updateMemberCard(memberCardDto:CreateMemberCardDto,id)
    {
         await this.unitOfWork.scope(async transaction => {
            const memberCard = await this.memberCardModel.findOne({
              where: { id },
              transaction
            });
            if (!memberCard) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: 'Member Card not exists',
                },
                HttpStatus.BAD_REQUEST,
              );
            }
            await this.memberCardModel.update(memberCardDto, {
              where: { id },
              transaction,
            });
            return true;
          });
          return true;
    }

    async getAll(memberCardQuery: FilterMemberCardDto )
    {
        var filter :LooseObject = {};
        if(memberCardQuery.name)
        {
          filter.name = memberCardQuery.name;
        }
       
        const options = { page: memberCardQuery.page, limit: memberCardQuery.limit };
        const searchOptions = {
          where: filter
        };
        
        return paginate(this.memberCardModel, options,searchOptions);
    }

    async deleteMemberCard(id: string) {
      return this.unitOfWork.scope(async transaction => {
        await this.memberCardModel.destroy({ where: { id }, transaction });
        return true;
      });
    }
}