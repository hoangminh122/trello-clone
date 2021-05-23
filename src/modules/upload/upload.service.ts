import { Injectable, HttpStatus, HttpException, Inject } from "@nestjs/common";
import { Files } from "src/entities/file";
import { idFile } from "./config";

@Injectable()
export class UploadService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private readonly fileRepository: typeof Files,
  ) {}

  async saveFile(file) {
    try {
      const dataFile = {
        originalName: idFile.id,
        fileName: file[0].fieldname,
        size: file[0].size
      }
      console.log(dataFile)
      const files = await this.fileRepository.create(dataFile);
      if (!files) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad Request !',
          },
          HttpStatus.BAD_REQUEST
        );
      }
      console.log(files.id);
      //set idFile default
      idFile.id = '';

      return files.id;

    } catch (e) {
      idFile.id = '';
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Can not read file',
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findById(id: number) {
    const file = await this.fileRepository.findOne({
      where: {
        id,
      },
    });
    return file;
  }

  async findAll() {
    const file = await this.fileRepository.findAll();
    return file;
  }

  async updateFile(file, id) {
    try {
      const file = this.findById(id);
      if (!file) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Can not found file',
          },
          HttpStatus.NOT_FOUND
        );
      }
      const dataFile = {
        originalName: idFile.id,
        fileName: file[0].fieldname,
        size: file[0].size
      }
      return this.fileRepository.update(dataFile, { where: { id } });
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Can not read file',
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getFile(id) {
    try {
      const file = await this.findById(id);
      if (!file) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Can not found file',
          },
          HttpStatus.NOT_FOUND
        );
      }
      return file;


    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Can not read URL',
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
