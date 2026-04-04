import { PrismaClient } from "@/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

// Type definitions
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = `${process.env.DATABASE_URL}`;
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV === "development") globalForPrisma.prisma = prisma;

export default prisma;
