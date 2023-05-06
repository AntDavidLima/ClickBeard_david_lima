import '@fastify/jwt';

declare module '@fastift/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
    }
  }
}