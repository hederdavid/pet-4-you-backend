import {
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiConflictResponse,
  ApiOperationOptions,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';

export function ApiCreateOperation(
  operationOptions: ApiOperationOptions,
  dataType: Type<unknown>,
) {
  return applyDecorators(
    ApiOperation(operationOptions),
    ApiCreatedResponse({
      description: 'Recurso criado com sucesso!',
      type: dataType,
    }),
    ApiUnauthorizedResponse({
      description: 'Credenciais inválidas!',
    }),
    ApiBadRequestResponse({
      description: 'Requisição inválida!',
    }),
    ApiConflictResponse({
      description: 'Dados com conflitos!',
    }),
    ApiForbiddenResponse({
      description: 'Nível de acesso inválido!',
    }),
  );
}
