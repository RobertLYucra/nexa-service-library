# @robertlyucra/nexa-core

Librería principal y compartida para todos los microservicios de la arquitectura Nexa (YR Ingenieros). Centraliza servicios de AWS, configuraciones de base de datos, excepciones, middlewares de Serverless y utilidades transversales.

## Instalación

Esta es una librería privada alojada en GitHub Packages. Para poder instalarla en tus proyectos, necesitas configurar un Personal Access Token (PAT) de GitHub.

### 1. Configurar Autenticación
En la raíz de tu proyecto consumidor (ej. `yr-ingenieros-service`), crea un archivo llamado `.npmrc` con el siguiente contenido:

```text
@robertlyucra:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TU_TOKEN_DE_GITHUB_AQUI
```
*(Nota: Asegúrate de agregar `.npmrc` a tu `.gitignore` para no subir tu token por accidente).*

### 2. Instalar el paquete
```bash
npm install @robertlyucra/nexa-core
```

---

## Módulos y Servicios Incluidos

### ☁️ AWS Services
Envolturas (wrappers) tipadas para los clientes oficiales de AWS (`@aws-sdk/client-*`) compatibles con la Inyección de Dependencias de NestJS.

- **`S3Service`**: Subida, descarga y generación de URLs prefirmadas.
- **`SqsService`**: Envío y consumo de mensajes en colas SQS.
- **`SnsService`**: Publicación de notificaciones en temas SNS.
- **`EventBridgeService`**: Emisión de eventos a buses de EventBridge.
- **`LambdaClientService`**: Invocación de otras funciones Lambda de manera síncrona o asíncrona.
- **`SchedulerService`**: Programación de tareas mediante AWS EventBridge Scheduler.

**Ejemplo de uso:**
```typescript
import { S3Service } from '@robertlyucra/nexa-core';

@Injectable()
export class MiServicio {
  constructor(private readonly s3Service: S3Service) {}

  async subirArchivo() {
    await this.s3Service.uploadFile(buffer, 'mi-bucket', 'ruta/archivo.jpg');
  }
}
```

### 💾 Base de Datos
Configuraciones predeterminadas para TypeORM, optimizadas para conexiones Serverless (mantenimiento de pool, timeouts y reintentos).

- **`DatabaseModule`**: Módulo base listo para ser importado en tu `AppModule`.
- **`database.config`**: Parámetros de conexión estándar.

### 🛑 Excepciones y Filtros
Manejo centralizado de errores HTTP para devolver respuestas estandarizadas a los clientes móviles/web.

- **`ApiException`**: Clase base para excepciones de dominio personalizadas.
- **`HttpExceptionFilter`**: Filtro global de NestJS que atrapa y formatea los errores (Loggea en CloudWatch y devuelve un JSON limpio).

**Ejemplo de uso:**
```typescript
import { ApiException } from '@robertlyucra/nexa-core';

throw new ApiException('El usuario no existe', 404, 'USER_NOT_FOUND');
```

### ⚙️ Middlewares Serverless
Adaptadores para procesar los distintos tipos de eventos que puede recibir tu API o Worker desde la infraestructura de AWS.

- **`ServerlessHandler`**: Adaptador principal para usar NestJS junto con `@codegenie/serverless-express` en Lambdas expuestas por API Gateway.
- **`ApiGatewayEventMiddleware`**: Filtro para requests HTTP.
- **`SqsEventMiddleware`**, **`SnsEventMiddleware`**, **`EventBridgeEventMiddleware`**: Middlewares para workers que procesan colas o eventos en background.

**Ejemplo de uso (en `serverless.ts`):**
```typescript
import { ServerlessHandler } from '@robertlyucra/nexa-core';
import { AppModule } from './app.module';

const serverlessHandler = new ServerlessHandler({
  module: AppModule,
  prefix: 'api'
});

export const handler = serverlessHandler.getHandler();
```

### 🛠️ Utilidades y Constantes
- **Enums Compartidos**: `Channel`, `CampaignType`, `CampaignStatus`, etc.
- **Validadores**: `PhoneValidatorHelper`.
- **Helpers**: Utilidades para manejo de fechas (`DateUtil`), paginación (`PaginationUtil`), formato de respuestas (`ResponseUtil`) y manejo de archivos (`FileHelper`).

---

## Desarrollo y Contribución

Si necesitas agregar nuevas funcionalidades a esta librería:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/RobertLYucra/nexa-service-library.git nexa-core
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Realiza tus cambios dentro de la carpeta `src/`.
4. Compila y publica una nueva versión:
   ```bash
   npm run build
   # Recuerda actualizar la versión en package.json (ej. de 1.0.0 a 1.0.1)
   npm publish
   ```
5. Actualiza la librería en tus microservicios:
   ```bash
   npm update @robertlyucra/nexa-core
   ```
