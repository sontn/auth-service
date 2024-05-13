import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionLoggingFilter implements ExceptionFilter {
  logger = new Logger(ExceptionLoggingFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const errorResponse = JSON.stringify(exception.response);

    this.logger.error(
      `Exception thrown: ${exception.message}, Exception error message: ${errorResponse}, Request: ${request.method} ${request.url} `,
    );

    response.status(status).json({
      statusCode: status,
      message,
      error: {
        response: exception.response,
      },
    });
  }
}
