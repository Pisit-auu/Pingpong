-- CreateTable
CREATE TABLE "PlayCounter" (
    "id" SERIAL NOT NULL,
    "finished" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlayCounter_pkey" PRIMARY KEY ("id")
);
