import {
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOperationOptions,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';

export function ApiSearchOperation(
  operationOptions: ApiOperationOptions,
  dataType: Type<unknown>,
) {
  return applyDecorators(
    ApiOperation(operationOptions),
    ApiOkResponse({ description: 'Requisição bem-sucedida!', type: dataType }),
    ApiBadRequestResponse({ description: 'Requisição inválida!' }),
    ApiUnauthorizedResponse({ description: 'Credenciais inválidas!' }),
    ApiForbiddenResponse({ description: 'Nível de acesso insuficiente!' }),
  );
}
