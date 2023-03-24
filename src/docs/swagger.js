const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Metadata
const option = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Red Jobs Project", version: "1.0.0" },
    servers: [{
      url: "http://localhost:3000"
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        projectState: {
            type: "object",
            properties: {
              state: {
                type: "boolean"
              }
            }
          },
        forgot: {
            type: "object",
            properties: {
              email: {
                type: "string"
              }
            }
          },
        login: {
          type: "object",
          properties: {
            email: {
              type: "string"
            },
            password: {
              type: "string"
            }
          }
        },
        user: {
          type: "object",
          properties: {
            name: { type: "string" },
            last_name: { type: "string"},
            email: { type: "string"},
            password: {  type: "string"  },
            phone: { type: "integer" },
            role: { type: "string"  },
            state:{  type: "boolean"}
          }
        },
        putUser: {
            type: "object",
            properties: {
              name: { type: "string" },
              last_name: { type: "string"},
              email: { type: "string"},
              phone: { type: "integer" },
              role: { type: "string"  },
              state:{  type: "boolean"}
            }
          },
        Project: {
          type: "object",
          properties: {
            emailUser: { type: "string" },
            title: { type: "string" },
            axis: { type: "string" },
            ods: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                          url: { type: "string" },
                          nameOds: { type: "string" },
                      }
              },
            },
            description: { type: "string" },
            indicator: { type: "string" },
            objective: { type: "string" },
            doc: { type: "string" },
            task: {
              type: "array",
              items: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    state: { type: "boolean" },
                }
              }
            },
            state:{  type: "boolean"}
          },
        },
      },
    },
  },
  apis: ["./src/V1/routes/*.js"]
};


// formatJson
const swaggerSpec = swaggerJsDoc(option);

// function to doc
const swaggerDoc = (app) => {
  app.use('/Api/v1/swagger/docs/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/Api/v1/swagger/docs.json', (req, res) => {
    res.setHeader('Comtent-Type', 'application/json');
    res.send(swaggerSpec);
  })
}



module.exports = { swaggerDoc }
