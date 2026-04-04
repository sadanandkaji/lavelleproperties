import { PrismaClient } from "./prisma/generated";
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // optional (remove in prod)
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}