import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Simple Blog Api",
            version: "1.0.0",
            description: "API documentation for this blog api",
        },
        servers: [{
                url: "http://localhost:3000",
                description: "Development server",
            }],
            components:{
                securitySchemes:{
                    bearerAuth:{
                        type:"http",
                        scheme:"bearer",
                        bearerFormat:"JWT"
                    },
                },
            },
            security:[{bearerAuth:[]}]
    },
    apis: ["./src/routes/*.ts"], // Path to your route files for Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;