import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Servidor MCP es la interfaz con el protocolo MCP. Maneja la comunicación entre el cliente y el servidor
const server = new McpServer({
  name: "demo",
  version: "1.0.0",
  description: "A simple MCP server for testing",
});

server.tool(
  "get-weather",
  "Tool to fetch the weather for a given city",
  {
    city: z.string().describe("City name"),
  },
  async ({ city }) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
    const data = await response.json();

    if (data.results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No weather data found for ${city}`,
          }
        ]
      };
    }

    const {latitude, longitude} = data.results[0];

    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&precipitation=true&hourly=temperature_2m&current=precipitation,temperature_2m,rain,is_day`);
    const weatherData = await weatherResponse.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(weatherData, null, 2)
        }
      ]
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);

console.log("Server is running on stdin/stdout");