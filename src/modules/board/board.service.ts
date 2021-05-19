import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UUIDV4 } from "sequelize";
import { Board } from "src/entities/Board";
import { UnitOfWork } from "../database/UnitOfWork";
import { CreateBoardDto } from "./dto/board.dto";



@Injectable()
export class BoardService {
    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
        @InjectModel(Board)
        private boardModel: typeof Board
    )
    {  }

    async addBoard(boardDto:CreateBoardDto)
    {
        return await (await this.boardModel.create(boardDto));
    }

    async updateBoard(boardDto:CreateBoardDto,id)
    {
         await this.unitOfWork.scope(async transaction => {
            const board = await this.boardModel.findOne({
              where: { id },
              transaction
            });
            if (!board) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: 'Board not exists',
                },
                HttpStatus.BAD_REQUEST,
              );
            }
            await this.boardModel.update(boardDto, {
              where: { id },
              transaction,
            });
            return true;
          });
          return true;
    }

    async getAll()
    {
        return await this.boardModel.findAll({
            order: [
            ['order', 'DESC'],
        ]
        });
    }

    async deleteBoard(id: string) {
      return this.unitOfWork.scope(async transaction => {
        await this.boardModel.destroy({ where: { id }, transaction });
        return true;
      });
    }
}