// import * as cls from 'continuation-local-storage';
import * as cls from 'cls-hooked';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { databaseConfig } from 'src/shared/config/database';
import { User } from 'src/entities/User';
import { Board } from '../../entities/Board';
import { Card } from '../../entities/Card';
import { List } from '../../entities/List';
import { Comment } from '../../entities/Comment';
import { MemberBoard } from 'src/entities/MemberBoard';
import { Label } from 'src/entities/Label';
import { Item } from './../../entities/Item';
import { Checklist } from './../../entities/Checklist';
import { MemberCard } from 'src/entities/MemberCard';
import { Files } from 'src/entities/File';

const namespace = cls.createNamespace('ENROLMENT_APPLICANTS_SERVICE');

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

export const databaseProvider = {
  provide: 'SequelizeInstance',
  useFactory: async () => {
    let config;
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'production':
        config = databaseConfig.production;
      case 'dev':
      case 'development':
        config = databaseConfig.development;
      default:
        config = databaseConfig.development;
    }
    (Sequelize as any).__proto__.useCLS(namespace);

    const sequelize = new Sequelize({ ...config, operatorsAliases });
    sequelize.addModels([
      User,
      MemberBoard,
      Board,
      Card,
      List,
      Comment,
      Label,
      Item,
      Checklist,
      MemberCard,
      Files
    ]);
    return sequelize.sync({ force: true });
  },
};
