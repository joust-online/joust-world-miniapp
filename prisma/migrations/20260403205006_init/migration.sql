-- CreateEnum
CREATE TYPE "PoolState" AS ENUM ('PENDING_ARBITER', 'ACTIVE', 'CLOSED', 'SETTLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ARBITER_INVITE', 'ARBITER_ACCEPTED', 'POOL_SETTLED', 'JOUST_CREATED', 'POOL_REFUNDED', 'PAYOUT_READY');

-- CreateEnum
CREATE TYPE "HonorVoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "address" VARCHAR(42) NOT NULL,
    "pfp" VARCHAR(255),
    "worldIdVerified" BOOLEAN NOT NULL DEFAULT false,
    "worldIdLevel" VARCHAR(10),
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pool" (
    "id" UUID NOT NULL,
    "contractId" BIGINT,
    "title" VARCHAR(200) NOT NULL,
    "description" VARCHAR(2000),
    "image" VARCHAR(255),
    "creatorId" INTEGER NOT NULL,
    "arbiterId" INTEGER,
    "arbiterAddress" VARCHAR(42) NOT NULL,
    "arbiterAccepted" BOOLEAN NOT NULL DEFAULT false,
    "arbiterFee" SMALLINT NOT NULL,
    "collateral" VARCHAR(42) NOT NULL,
    "minJoustAmount" BIGINT NOT NULL,
    "totalAmountJousted" BIGINT NOT NULL DEFAULT 0,
    "supportedJoustTypes" SMALLINT NOT NULL DEFAULT 2,
    "winningJoustType" SMALLINT NOT NULL DEFAULT 0,
    "state" "PoolState" NOT NULL DEFAULT 'PENDING_ARBITER',
    "endTime" TIMESTAMP(3) NOT NULL,
    "contractEndTime" INTEGER NOT NULL DEFAULT 0,
    "deployedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "settledAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoolOption" (
    "id" SERIAL NOT NULL,
    "poolId" UUID NOT NULL,
    "joustType" SMALLINT NOT NULL,
    "label" VARCHAR(400) NOT NULL,
    "orderIndex" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PoolOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Joust" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "poolId" UUID NOT NULL,
    "joustType" SMALLINT NOT NULL,
    "amount" BIGINT NOT NULL,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "txHash" VARCHAR(66),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Joust_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" VARCHAR(3000),
    "poolId" UUID,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HonorVote" (
    "id" SERIAL NOT NULL,
    "voterId" INTEGER NOT NULL,
    "arbiterId" INTEGER NOT NULL,
    "poolId" UUID NOT NULL,
    "voteType" "HonorVoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HonorVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HonorScore" (
    "arbiterId" INTEGER NOT NULL,
    "totalUpvotes" INTEGER NOT NULL DEFAULT 0,
    "totalDownvotes" INTEGER NOT NULL DEFAULT 0,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HonorScore_pkey" PRIMARY KEY ("arbiterId")
);

-- CreateTable
CREATE TABLE "WorldIdVerification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "nullifierHash" VARCHAR(68) NOT NULL,
    "verificationLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorldIdVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE INDEX "User_address_idx" ON "User"("address");

-- CreateIndex
CREATE INDEX "Pool_contractId_idx" ON "Pool"("contractId");

-- CreateIndex
CREATE INDEX "Pool_creatorId_idx" ON "Pool"("creatorId");

-- CreateIndex
CREATE INDEX "Pool_arbiterId_idx" ON "Pool"("arbiterId");

-- CreateIndex
CREATE INDEX "Pool_arbiterAddress_idx" ON "Pool"("arbiterAddress");

-- CreateIndex
CREATE INDEX "Pool_state_idx" ON "Pool"("state");

-- CreateIndex
CREATE INDEX "Pool_endTime_idx" ON "Pool"("endTime");

-- CreateIndex
CREATE INDEX "Pool_state_endTime_idx" ON "Pool"("state", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_contractId_key" ON "Pool"("contractId");

-- CreateIndex
CREATE INDEX "PoolOption_poolId_idx" ON "PoolOption"("poolId");

-- CreateIndex
CREATE UNIQUE INDEX "PoolOption_poolId_joustType_key" ON "PoolOption"("poolId", "joustType");

-- CreateIndex
CREATE UNIQUE INDEX "PoolOption_poolId_orderIndex_key" ON "PoolOption"("poolId", "orderIndex");

-- CreateIndex
CREATE INDEX "Joust_userId_idx" ON "Joust"("userId");

-- CreateIndex
CREATE INDEX "Joust_poolId_idx" ON "Joust"("poolId");

-- CreateIndex
CREATE INDEX "Joust_joustType_idx" ON "Joust"("joustType");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_read_idx" ON "Notification"("userId", "read");

-- CreateIndex
CREATE INDEX "Notification_poolId_idx" ON "Notification"("poolId");

-- CreateIndex
CREATE INDEX "HonorVote_arbiterId_idx" ON "HonorVote"("arbiterId");

-- CreateIndex
CREATE INDEX "HonorVote_voterId_idx" ON "HonorVote"("voterId");

-- CreateIndex
CREATE UNIQUE INDEX "HonorVote_voterId_arbiterId_poolId_key" ON "HonorVote"("voterId", "arbiterId", "poolId");

-- CreateIndex
CREATE INDEX "HonorScore_score_idx" ON "HonorScore"("score");

-- CreateIndex
CREATE UNIQUE INDEX "WorldIdVerification_nullifierHash_key" ON "WorldIdVerification"("nullifierHash");

-- CreateIndex
CREATE INDEX "WorldIdVerification_userId_idx" ON "WorldIdVerification"("userId");

-- CreateIndex
CREATE INDEX "WorldIdVerification_action_nullifierHash_idx" ON "WorldIdVerification"("action", "nullifierHash");

-- AddForeignKey
ALTER TABLE "Pool" ADD CONSTRAINT "Pool_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pool" ADD CONSTRAINT "Pool_arbiterId_fkey" FOREIGN KEY ("arbiterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoolOption" ADD CONSTRAINT "PoolOption_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Joust" ADD CONSTRAINT "Joust_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Joust" ADD CONSTRAINT "Joust_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HonorVote" ADD CONSTRAINT "HonorVote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HonorVote" ADD CONSTRAINT "HonorVote_arbiterId_fkey" FOREIGN KEY ("arbiterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HonorVote" ADD CONSTRAINT "HonorVote_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HonorScore" ADD CONSTRAINT "HonorScore_arbiterId_fkey" FOREIGN KEY ("arbiterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldIdVerification" ADD CONSTRAINT "WorldIdVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
