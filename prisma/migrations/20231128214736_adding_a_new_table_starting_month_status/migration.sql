-- CreateTable
CREATE TABLE "StartingMonthStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "month" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "StartingMonthStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
