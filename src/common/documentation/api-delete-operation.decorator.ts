import {
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperationOptions,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';

export function ApiDeleteOperation(
  operationOptions: ApiOperationOptions,
  dataType: Type<unknown>,
) {
  return applyDecorators(
    ApiOperation(operationOptions),
    ApiOkResponse({
      description: 'Recurso deletado com sucesso!',
      type: dataType,
    }),
    ApiUnauthorizedResponse({
      description: 'Credenciais inválidas!',
    }),
    ApiForbiddenResponse({
      description: 'Nível de acesso insuficiente!',
    }),
    ApiNotFoundResponse({
      description: 'Recurso não encontrado!',
    }),
  );
}
