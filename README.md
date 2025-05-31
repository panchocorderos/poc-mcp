# mcp-poc

Proyecto de prueba de concepto (POC) para un servidor MCP (Model Context Protocol) usando TypeScript y el SDK oficial.

## Descripción

Este proyecto implementa un servidor MCP sencillo que expone una herramienta para obtener el clima actual de una ciudad utilizando la API de Open-Meteo. El servidor se comunica a través de stdin/stdout, lo que lo hace ideal para integraciones o pruebas automatizadas.

## Requisitos

- Node.js (recomendado v18+)
- pnpm (o npm/yarn)

## Instalación

```bash
pnpm install
# o
npm install
# o
yarn install
```

## Uso

Para iniciar el servidor:

```bash
pnpm start
# o
node main.ts
```

El servidor expondrá una herramienta llamada `get-weather` que recibe el nombre de una ciudad y retorna información meteorológica actual.

## Dependencias principales

- `@modelcontextprotocol/sdk`: SDK oficial para implementar servidores MCP.
- `zod`: Validación de esquemas para los parámetros de las herramientas.

## Estructura principal

- `main.ts`: Implementación del servidor MCP y la herramienta de clima.
- `.gitignore`: Configuración para ignorar archivos y carpetas comunes en proyectos Node.js.

Para poder probar el servidor MCP con el inspector, se puede usar el siguiente comando:

```bash
npx @modelcontextprotocol/inspector npx -y tsx main.ts
```

Para agregar el mcp dentro del IDE, hay que seguir el siguiente formato json:

``` JSON
{
  "mcpServers": {
    "demo":{
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "<path_to>/mcp-poc/main.ts"
      ]
    }
  }
}
```