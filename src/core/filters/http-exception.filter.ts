import {
  BadRequestException as BadRequest,
  EntityNotFoundException,
  ExternalServiceException,
  ForbiddenResourceException,
  PersistenceException,
  UnauthorizedException,
} from '@features/common/exceptions';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number = 500;
    let message: string = 'Internal server error';
    let details: any;
    if (exception instanceof HttpException) {
      const { message: externalMessage, details: externalDetails } =
        this.httpException(exception);
      status = exception.getStatus();
      message = externalMessage;
      details = externalDetails;
    } else {
      const { status: internalStatus, message: internalMessage } =
        this.internalErrors(exception);
      status = internalStatus;
      message = internalMessage;
    }

    const code = this.getErrorCode(status);
    const errResponse = {
      success: false,
      message: message,
      error: {
        code: code,
        details: details,
        statusCode: status,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID(),
        path: request.url,
        method: request.method,
        status: status,
      },
    };
    this.catcheError(errResponse, request);
    response.status(status).json(errResponse);
  }

  private internalErrors(exception: any) {
    let status: number = 500;
    let message: string = 'Internal server error';
    if (exception instanceof BadRequest) {
      status = 400;
      message = exception.message;
    }
    if (exception instanceof UnauthorizedException) {
      status = 401;
      message = exception.message;
    }
    if (exception instanceof ForbiddenResourceException) {
      status = 403;
      message = exception.message;
    }
    if (exception instanceof EntityNotFoundException) {
      status = 404;
      message = exception.message;
    }
    if (exception instanceof ExternalServiceException) {
      status = 502;
      message = exception.message;
    }
    if (exception instanceof PersistenceException) {
      status = 500;
      message = exception.message;
    }
    return { status, message };
  }
  private httpException(exception: any) {
    let details: any = null;
    let message: string = 'Internal server error';
    const exceptionResponse = exception.getResponse();
    if (exception instanceof BadRequestException) {
      details = exceptionResponse.message;
      message = exception.message;
    }
    return { message, details };
  }

  private getErrorCode(status: number): string {
    const errorCodes = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'VALIDATION_ERROR',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_SERVER_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE',
    };
    return errorCodes[status] || 'UNKNOWN_ERROR';
  }
  private catcheError(errResponse: any, request: Request) {}
}
