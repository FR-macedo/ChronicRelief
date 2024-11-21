const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Chronic Relief API",
      version: "1.0.0",
      description: "Documentação da API do projeto de residência do semestre 2024.2",
    },
    servers: [
      {
        url: "http://localhost:3100", 
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./models/*.js", "./services/*.js"], // Caminho para os arquivos das rotas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
