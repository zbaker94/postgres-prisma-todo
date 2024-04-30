-- DropForeignKey
ALTER TABLE "vent" DROP CONSTRAINT "vent_sentimentId_fkey";

-- AlterTable
ALTER TABLE "vent" ALTER COLUMN "sentimentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "vent" ADD CONSTRAINT "vent_sentimentId_fkey" FOREIGN KEY ("sentimentId") REFERENCES "sentiment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
