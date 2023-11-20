/*
  Warnings:

  - Added the required column `subcategoryFrom` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoryFromId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoryTo` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoryToId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "accountFrom" TEXT NOT NULL,
    "accountFromId" TEXT NOT NULL,
    "subcategoryFrom" TEXT NOT NULL,
    "subcategoryFromId" TEXT NOT NULL,
    "accountTo" TEXT NOT NULL,
    "accountToId" TEXT NOT NULL,
    "subcategoryTo" TEXT NOT NULL,
    "subcategoryToId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountFrom", "accountFromId", "accountTo", "accountToId", "amount", "date", "description", "id", "type", "userId") SELECT "accountFrom", "accountFromId", "accountTo", "accountToId", "amount", "date", "description", "id", "type", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
