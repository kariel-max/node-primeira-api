import fastify from 'fastify'
import crypto from 'node:crypto'
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
})

const courses = [
    {id: '1', title: 'Curso de Node.js'},
    {id: '2', title: 'Curso de React'},
    {id: '3', title: 'Curso de React.Native'},
]

server.get('/courses', (request, reply)=> {
    return reply.status(200).send({courses})
})
server.post('/courses', (request, reply)=> {
    const courseId = crypto.randomUUID()

    courses.push({id: courseId, title: 'Novo curso'})

    return reply.status(201).send({courseId})
})

server.listen({port:3333}).then(()=> {
    console.log('HTTP server running!')
})