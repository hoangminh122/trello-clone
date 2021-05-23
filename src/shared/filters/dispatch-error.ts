import { ExceptionFilter, ArgumentsHost, ForbiddenException, HttpStatus, HttpException, Catch} from "@nestjs/common";
import { ValidationError } from "sequelize";


@Catch(ValidationError, HttpException, Error)
export class DispatchError implements ExceptionFilter {
    catch(err: any, host: ArgumentsHost) {
       const res = host.switchToHttp().getResponse();
       console.log(err);
       if(err instanceof HttpException) {
        res.header('x-message', (err as any).message);
        res.header('Content-Type', 'application/json');
        return res.status(HttpStatus.BAD_REQUEST).send(err.message);
       }
       if(err instanceof ForbiddenException) {
        res.header('x-message', (err as any).message);
        res.header('Content-Type', 'application/json');
        return res.status(HttpStatus.FORBIDDEN).send(err.message);
       }
       if (err instanceof ValidationError) {
        /* Sequelize validation error. */
        res.header(
          'x-message-code-error',
          (err as ValidationError).errors[0].type,
        );
        res.header('x-message', (err as ValidationError).errors[0].message);
        res.header('x-httpStatus-error', HttpStatus.BAD_REQUEST);
        res.header('Content-Type', 'application/json');
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      }


    }

}