/*
  Warnings:

  - Added the required column `accountFromId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountToId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "accountFrom" TEXT NOT NULL,
    "accountFromId" TEXT NOT NULL,
    "accountTo" TEXT NOT NULL,
    "accountToId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountFrom", "accountTo", "amount", "date", "description", "id", "type", "userId") SELECT "accountFrom", "accountTo", "amount", "date", "description", "id", "type", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
