import { redisClient as redis } from '../db/redis'
import { Request, Response, NextFunction } from 'express'

export const ipBasedLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip?.replace(/:/g, ''); // prevent redis to create idle folders
  
    const url = req.url.slice(1) // remove slashes of url
    const key = `${url}_${ip}`

    const hour = 60 * 60;

    const requests = await redis.incr(key)

    let ttl;
    if (requests === 1) {
        await redis.expire(key, hour)
        ttl = hour
    } else {
        ttl = await redis.ttl(key)
    }

    if (requests > Number(process.env.RATE_LIMIT_BY_IP_PER_HOUR)) {
        const nextRequest = `you will be able to request data again in ${Math.ceil(ttl / 60)} minutes`
        return res.status(429).send({
            message: "Your request limit for this service has been exceeded.",
            nextRequestIn: nextRequest,
            requestPerHour: process.env.RATE_LIMIT_BY_IP_PER_HOUR
        })
    }
    next()
}

export const tokenBasedLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader: string = (req.headers.authorization || req.headers.Authorization || "") as string;
    const token = tokenHeader?.split(" ")[1]

    const url = req.url.slice(1)
    const key = `${url}_${token}`

    const hour = 60 * 60;

    const requests = await redis.incr(key)

    let ttl;
    if (requests === 1) {
        await redis.expire(key, hour)
        ttl = hour
    } else {
        ttl = await redis.ttl(key)
    }

    if (requests > Number(process.env.RATE_LIMIT_BY_TOKEN_PER_HOUR)) {
        const nextRequest = `you will be able to request data again in ${Math.ceil(ttl / 60)} minutes`
        return res.status(429).send({
            message: "Your request limit for this service has been exceeded.",
            nextRequestIn: nextRequest,
            requestPerHour: process.env.RATE_LIMIT_BY_TOKEN_PER_HOUR
        })
    }
    next()
}