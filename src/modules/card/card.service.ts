import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Card } from "src/entities/Card";
import { Checklist } from "src/entities/Checklist";
import { Label } from "src/entities/Label";
import { MemberBoard } from "src/entities/MemberBoard";
import { MemberCard } from "src/entities/MemberCard";
import { LooseObject } from "src/shared/interfaces/loose-object.interface";
import { paginate } from "src/shared/paginate/paginate";
import { UnitOfWork } from "../database/UnitOfWork";
import { MemberCardService } from "../member-card/member-card.service";
import { CreateCardDto } from "./dto/card-create.input";
import { UpdateCardDto } from "./dto/card-update.input";
import { FilterCardDto } from "./dto/filter-card.input";
import { MemberCardDto } from './../member-card/dto/member-card.dto';
import { CreateMemberCardDto } from './../member-card/dto/member-card-create.input';

@Injectable()
export class CardService {
    constructor(
      @Inject(UnitOfWork)
      private readonly unitOfWork: UnitOfWork,
      @InjectModel(Card)
      private cardModel: typeof Card,
      @InjectModel(Label)
      private labelModel: typeof Label,
      @InjectModel(Checklist)
      private checklistModel: typeof Checklist,
      @InjectModel(MemberBoard)
      private memberBoardModel: typeof MemberBoard,
      @InjectModel(MemberCard)
      private memberCardModel: typeof MemberCard,
      private memberCardService: MemberCardService
    )
    {  }

    async addCard(cardDto:CreateCardDto)
    {
      return await (await this.cardModel.create(cardDto));
    }

    async updateCard(cardDto:UpdateCardDto,id)
    {
      await this.unitOfWork.scope(async transaction => {
        const card = await this.cardModel.findOne({
          where: { id },
          transaction
        });
        if (!card) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              message: ' Card not exists',
            },
            HttpStatus.BAD_REQUEST,
          );
        }


        //check label is exist
        if(cardDto.labelId)
        {
          const label = await this.labelModel.findOne({
            where: { id:cardDto.labelId },
            transaction
          });
          if (!label) {
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                message: ' Label not exists',
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        }

        //check Checklist is exist ?
        if(cardDto.checklistId)
        {
          const checklist = await this.checklistModel.findOne({
            where: { id :cardDto.checklistId},
            transaction
          });
          if (!checklist) {
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                message: ' Checklist not exists',
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        }

        //add member in Card ->  check is member is has invite of board
        //get all member invite of board
        if(cardDto.memberJoins)
        {
          const memberBoard = await this.memberBoardModel.findAll({
            where: { id:cardDto.memberJoins},
            transaction
          });
          if (!memberBoard) {
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                message: ' Member Board not exists',
              },
              HttpStatus.BAD_REQUEST,
            );
          } else {
            if(memberBoard.findIndex(x =>x.id == cardDto.memberJoins) == -1)
              throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: ' Member not invite board',
                },
                HttpStatus.BAD_REQUEST,
              );

              //add member in card
              let memberCardDto = new CreateMemberCardDto();
              memberCardDto.userId = cardDto.memberJoins;
              memberCardDto.cardId = card.id
              this.memberCardService.addMemberCard(memberCardDto);
          }
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