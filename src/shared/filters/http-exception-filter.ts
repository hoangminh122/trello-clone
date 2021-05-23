import { ExceptionFilter, ArgumentsHost, HttpException, Catch, HttpStatus, Logger } from "@nestjs/common";
import {Response,Request} from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const err = exception.getResponse();
    
        response
          .status(status)
          .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            success:1,
            error: err

          });
      }
    
}