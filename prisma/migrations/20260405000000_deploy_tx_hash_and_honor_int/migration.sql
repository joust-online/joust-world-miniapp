-- AlterTable: Add deployTxHash to Pool for retry tracking
ALTER TABLE "Pool" ADD COLUMN "deployTxHash" VARCHAR(66);

-- AlterTable: Change HonorScore.score from Float to Int
ALTER TABLE "HonorScore" ALTER COLUMN "score" SET DATA TYPE INTEGER USING ROUND(score)::INTEGER;
