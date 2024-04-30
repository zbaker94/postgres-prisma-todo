-- CreateTable
CREATE TABLE "sentiment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sentiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "sentimentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vent" ADD CONSTRAINT "vent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vent" ADD CONSTRAINT "vent_sentimentId_fkey" FOREIGN KEY ("sentimentId") REFERENCES "sentiment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
