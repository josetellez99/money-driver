/*
  Warnings:

  - You are about to alter the column `month` on the `BudgetItem` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to drop the column `month` on the `StartingMonthStatus` table. All the data in the column will be lost.
  - Added the required column `monthAndYear` to the `StartingMonthStatus` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BudgetItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "used" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL,
    "month" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "BudgetItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BudgetItem" ("amount", "id", "month", "remaining", "title", "type", "used", "userId") SELECT "amount", "id", "month", "remaining", "title", "type", "used", "userId" FROM "BudgetItem";
DROP TABLE "BudgetItem";
ALTER TABLE "new_BudgetItem" RENAME TO "BudgetItem";
CREATE TABLE "new_StartingMonthStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monthAndYear" DATETIME NOT NULL,
    "availableMoney" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "StartingMonthStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StartingMonthStatus" ("availableMoney", "id", "userId") SELECT "availableMoney", "id", "userId" FROM "StartingMonthStatus";
DROP TABLE "StartingMonthStatus";
ALTER TABLE "new_StartingMonthStatus" RENAME TO "StartingMonthStatus";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
