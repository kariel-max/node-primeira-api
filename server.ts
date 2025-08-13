import fastify from 'fastify'
import { db } from './src/database/client.ts'
import { courses } from './src/database/schema.ts'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod'
import  { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { z } from 'zod'
import dotenv from 'dotenv';
import { brotliDecompressSync } from 'zlib'
import { getByIdCoursesRoute } from './src/routes/getByIdCourses.ts'
import { createCourses } from './src/routes/createCourses.ts'

dotenv.config();
const server = fastify({
    logger: {
         transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      }, 
    },
    }
}).withTypeProvider<ZodTypeProvider>()

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Desafio Node.js',
      version: '1.0.0',
    }
  },
  transform: jsonSchemaTransform,
})


server.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(getByIdCoursesRoute)
server.register(createCourses)

server.listen({port:3333}).then(()=> {
    console.log('HTTP server running!')
})