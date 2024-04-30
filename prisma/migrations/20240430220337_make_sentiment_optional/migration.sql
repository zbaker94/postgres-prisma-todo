/*
  Warnings:

  - A unique constraint covering the columns `[sentimentId]` on the table `vent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "vent_sentimentId_key" ON "vent"("sentimentId");
