-- AlterTable
ALTER TABLE "Pool" ADD COLUMN     "aiArbiterId" INTEGER;

-- CreateTable
CREATE TABLE "AiArbiter" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(2000),
    "category" VARCHAR(50) NOT NULL,
    "strategy" TEXT NOT NULL,
    "walletAddress" VARCHAR(42) NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiArbiter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentKitUsage" (
    "id" SERIAL NOT NULL,
    "endpoint" VARCHAR(500) NOT NULL,
    "humanId" VARCHAR(100) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AgentKitUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentKitNonce" (
    "nonce" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentKitNonce_pkey" PRIMARY KEY ("nonce")
);

-- CreateIndex
CREATE INDEX "AiArbiter_category_idx" ON "AiArbiter"("category");

-- CreateIndex
CREATE INDEX "AiArbiter_creatorId_idx" ON "AiArbiter"("creatorId");

-- CreateIndex
CREATE INDEX "AiArbiter_walletAddress_idx" ON "AiArbiter"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "AgentKitUsage_endpoint_humanId_key" ON "AgentKitUsage"("endpoint", "humanId");

-- AddForeignKey
ALTER TABLE "Pool" ADD CONSTRAINT "Pool_aiArbiterId_fkey" FOREIGN KEY ("aiArbiterId") REFERENCES "AiArbiter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiArbiter" ADD CONSTRAINT "AiArbiter_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
