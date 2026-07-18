import { Injectable } from '@nestjs/common';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { ApiException } from '../exceptions/api.exception';

export interface LambdaHttpRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  pathParameters?: Record<string, string>;
  queryStringParameters?: Record<string, string>;
  body?: any;
  headers?: Record<string, string>;
}

@Injectable()
export class LambdaClientService {
  private client: LambdaClient;

  constructor() {
    this.client = new LambdaClient({
      region: process.env.AWS_REGION || 'us-east-2',
    });
  }

  async invoke(functionName: string, payload: any): Promise<any> {
    const command = new InvokeCommand({
      FunctionName: functionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload),
    });

    try {
      const response = await this.client.send(command);

      if (response.FunctionError) {
        const errorPayload = response.Payload
          ? JSON.parse(new TextDecoder().decode(response.Payload))
          : { message: 'Unknown error' };
        throw ApiException.internalServerError(
          `Lambda invocation failed: ${response.FunctionError} - ${JSON.stringify(errorPayload)}`,
        );
      }

      const result = JSON.parse(new TextDecoder().decode(response.Payload));
      return result;
    } catch (error) {
      if (error instanceof ApiException) throw error;
      throw ApiException.internalServerError(
        `Failed to invoke lambda ${functionName}: ${error.message}`,
      );
    }
  }

  /**
   * Invokes a Lambda function simulating an HTTP event (high level)
   */
  async invokeHttp(
    functionName: string,
    request: LambdaHttpRequest,
  ): Promise<any> {
    // Evento minimalista compatible con la plataforma
    const event = {
      httpMethod: request.method,
      path: request.path,
      resource: request.path,
      headers: {
        'Content-Type': 'application/json',
        'X-Lambda-Invoke': 'true',
        ...request.headers,
      },
      queryStringParameters: request.queryStringParameters || null,
      multiValueQueryStringParameters: request.queryStringParameters
        ? Object.keys(request.queryStringParameters).reduce(
            (acc, key) => {
              acc[key] = [request.queryStringParameters![key]];
              return acc;
            },
            {} as Record<string, string[]>,
          )
        : null,
      pathParameters: request.pathParameters || null,
      body: request.body ? JSON.stringify(request.body) : null,
      requestContext: {
        httpMethod: request.method,
        resourcePath: request.path,
        path: request.path,
        identity: { sourceIp: '127.0.0.1' },
      },
    };

    const result = await this.invoke(functionName, event);

    if (result && typeof result.statusCode === 'number') {
      let body = result.body;
      try {
        if (typeof body === 'string') {
          body = JSON.parse(body);
        }
      } catch (e) {
        // Si falla el parseo, usamos el body tal cual
      }

      if (result.statusCode >= 400) {
        const remoteMessage = body?.message || JSON.stringify(body);

        switch (result.statusCode) {
          case 400:
            throw ApiException.badRequest(remoteMessage);
          case 401:
            throw ApiException.unauthorized(remoteMessage);
          case 403:
            throw ApiException.forbidden(remoteMessage);
          case 404:
            throw ApiException.notFound(
              remoteMessage,
              undefined,
              'INVOKE_NOT_FOUND',
            );
          case 409:
            throw ApiException.conflict(
              remoteMessage,
              undefined,
              'INVOKE_CONFLICT',
            );
          default:
            throw ApiException.internalServerError(
              remoteMessage || `Status ${result.statusCode}`,
            );
        }
      }

      return body?.data !== undefined ? body.data : body;
    }

    return result?.data !== undefined ? result.data : result;
  }

  async get(
    functionName: string,
    path: string,
    queryParams?: Record<string, any>,
  ): Promise<any> {
    const stringParams = queryParams
      ? Object.entries(queryParams).reduce(
          (acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          },
          {} as Record<string, string>,
        )
      : undefined;

    return this.invokeHttp(functionName, {
      method: 'GET',
      path,
      queryStringParameters: stringParams,
    });
  }

  async post(functionName: string, path: string, body: any): Promise<any> {
    return this.invokeHttp(functionName, {
      method: 'POST',
      path,
      body,
    });
  }

  async put(functionName: string, path: string, body: any): Promise<any> {
    return this.invokeHttp(functionName, {
      method: 'PUT',
      path,
      body,
    });
  }

  async delete(functionName: string, path: string): Promise<any> {
    return this.invokeHttp(functionName, {
      method: 'DELETE',
      path,
    });
  }
}
