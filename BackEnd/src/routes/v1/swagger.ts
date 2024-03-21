import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Metadata info about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Kestela Api", version: "1.0.0" },
  },
  apis: ["src/routes/v1/*.ts"],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app: any, port: string) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Version 1 Docs are available at HOST:${port}/api/v1/docs`);
};

export { swaggerDocs };
