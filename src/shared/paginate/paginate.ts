import { IPaginationOptions } from './interfaces';
import { FindAndCountOptions, Model } from 'sequelize';
import { Pagination } from './pagination';
export async function paginate<T extends Model<T>>(
  repository: any,
  options: IPaginationOptions,
  searchOptions?: FindAndCountOptions,
): Promise<Pagination<T>> {

    console.log("test :"+options.page);
  const page =
    options.page > 0 ? options.page - 1 : options.page < 0 ? 0 : options.page;
  const limit = options.limit;
  const route = options.route;

  const {
    rows: items,
    count: total,
  } = await (repository as any).findAndCountAll({
    offset: page * limit,
    limit: limit,
    ...searchOptions
  });

  const isNext = route && total / limit >= page + 1;
  const isPrevious = route && page > 0;
  const routes = {
    next: isNext ? `${route}?page=${page + 2}&limit=${limit}` : '',
    previous: isPrevious ? `${route}?page=${page}&limit=${limit}` : '',
  };

  return new Pagination(
    items,
    items.length,
    total,
    limit ? Math.ceil(total / limit) : 1,
    routes.next,
    routes.previous,
  );
}
