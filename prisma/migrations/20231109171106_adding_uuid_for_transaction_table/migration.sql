/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "accountFrom" TEXT NOT NULL,
    "accountTo" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Transaction" ("accountFrom", "accountTo", "amount", "date", "description", "id", "type") SELECT "accountFrom", "accountTo", "amount", "date", "description", "id", "type" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
