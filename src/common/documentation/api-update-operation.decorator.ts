import {
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiOperationOptions,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';

export function ApiUpdateOperation(
  operationOptions: ApiOperationOptions,
  dataType: Type<unknown>,
) {
  return applyDecorators(
    ApiOperation(operationOptions),
    ApiOkResponse({
      description: 'Recurso atualizado com sucesso!',
      type: dataType,
    }),
    ApiUnauthorizedResponse({
      description: 'Credenciais inválidas!',
    }),
    ApiNotFoundResponse({
      description: 'Recurso não encontrado!',
    }),
    ApiConflictResponse({
      description: 'Dados com conflitos!',
    }),
    ApiBadRequestResponse({
      description: 'Requisição inválida!',
    }),
  );
}
