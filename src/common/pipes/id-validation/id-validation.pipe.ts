import { ArgumentMetadata, BadRequestException, Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';
import { ExternalExceptionsHandler } from '@nestjs/core/exceptions/external-exceptions-handler';

@Injectable()
export class IdValidationPipe extends ParseIntPipe {

  constructor() {
    super({
      exceptionFactory: () => new BadRequestException('Id invalido')
    });
  }
}
