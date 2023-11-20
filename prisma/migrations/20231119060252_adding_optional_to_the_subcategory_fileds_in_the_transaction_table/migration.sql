-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "accountFrom" TEXT NOT NULL,
    "accountFromId" TEXT NOT NULL,
    "subcategoryFrom" TEXT,
    "subcategoryFromId" TEXT,
    "accountTo" TEXT NOT NULL,
    "accountToId" TEXT NOT NULL,
    "subcategoryTo" TEXT,
    "subcategoryToId" TEXT,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountFrom", "accountFromId", "accountTo", "accountToId", "amount", "date", "description", "id", "subcategoryFrom", "subcategoryFromId", "subcategoryTo", "subcategoryToId", "type", "userId") SELECT "accountFrom", "accountFromId", "accountTo", "accountToId", "amount", "date", "description", "id", "subcategoryFrom", "subcategoryFromId", "subcategoryTo", "subcategoryToId", "type", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
