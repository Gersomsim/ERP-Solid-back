import {
  BadRequestException as BadRequest,
  EntityNotFoundException as EntityNotFound,
  ExternalServiceException as ExternalService,
  ForbiddenResourceException as ForbiddenResource,
  PersistenceException as Persistence,
  UnauthorizedException as Unauthorized,
} from '@features/common/exceptions';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');
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

    const {
      status: dbStatus,
      message: dbMessage,
      details: dbDetails,
    } = this.errorsDB(exception, details, message, status);
    status = dbStatus;
    message = dbMessage;
    details = dbDetails;

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
        requestId: request['correlationId'],
        path: request.url,
        method: request.method,
        status: status,
      },
    };
    this.catcheError(errResponse, request, exception);
    response.status(status).json(errResponse);
  }
  private errorsDB(
    exception: any,
    details: any,
    message: string,
    status: number,
  ) {
    if (exception instanceof ConflictException) {
      const exceptionResponse = exception.getResponse() as { message: string };
      status = 409;
      details = exceptionResponse.message;
      message = 'Conflict exception';
    }
    return { status, message, details };
  }

  private internalErrors(exception: any) {
    let status: number = 500;
    let message: string = 'Internal server error';
    if (exception instanceof BadRequest) {
      status = 400;
      message = exception.message;
    }
    if (exception instanceof Unauthorized) {
      status = 401;
      message = exception.message;
    }
    if (exception instanceof ForbiddenResource) {
      status = 403;
      message = exception.message;
    }
    if (exception instanceof EntityNotFound) {
      status = 404;
      message = exception.message;
    }
    if (exception instanceof ExternalService) {
      status = 502;
      message = exception.message;
    }
    if (exception instanceof Persistence) {
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
    if (exception instanceof NotFoundException) {
      details = exceptionResponse.message;
      message = exceptionResponse.error;
    }
    if (exception instanceof UnauthorizedException) {
      details = exceptionResponse.message;
      message = exceptionResponse.error;
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
  private catcheError(errResponse: any, request: Request, exception: any) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const correlationId = request['correlationId'];

    this.logger.error(
      `[${correlationId}] ${request.method} ${request.url} - Status: ${status}`,
      exception.stack,
    );
  }
}
