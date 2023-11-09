-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "accountFrom" TEXT NOT NULL,
    "accountTo" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT NOT NULL
);
