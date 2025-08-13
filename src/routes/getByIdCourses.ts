import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client"
import { courses } from "../database/schema"
import { z } from "zod"

export const getByIdCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses/:id', {
        schema: {
            params: z.object({
                id: z.uuid(),
            })
        }
    }, async (request, reply)=> {
        const result = await db.select().from(courses)
    
        return reply.status(200).send({result})
    })
}