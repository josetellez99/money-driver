/*
  Warnings:

  - Added the required column `availableMoney` to the `StartingMonthStatus` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StartingMonthStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "month" TEXT NOT NULL,
    "availableMoney" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "StartingMonthStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StartingMonthStatus" ("id", "month", "userId") SELECT "id", "month", "userId" FROM "StartingMonthStatus";
DROP TABLE "StartingMonthStatus";
ALTER TABLE "new_StartingMonthStatus" RENAME TO "StartingMonthStatus";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
