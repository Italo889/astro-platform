-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "badges" JSONB,
ADD COLUMN     "betaTesterNumber" INTEGER,
ADD COLUMN     "isBetaTester" BOOLEAN NOT NULL DEFAULT false;
