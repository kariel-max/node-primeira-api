import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client"
import { courses } from "../database/schema"
import { z } from "zod"

export const createCourses: FastifyPluginAsyncZod = async (server) => {
    server.post('/courses', {
        schema: {
            body: z.object({
                title: z.string(),
                description: z.string(),
            })
        }
    }, async (request, reply)=> {
        const result = await db.insert(courses).values(request.body).returning()
    
        return reply.status(200).send({result})
    })
}