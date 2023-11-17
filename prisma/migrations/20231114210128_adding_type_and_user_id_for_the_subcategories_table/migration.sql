/*
  Warnings:

  - Added the required column `userId` to the `BudgetSubcategory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BudgetSubcategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "used" INTEGER NOT NULL DEFAULT 0,
    "remaining" INTEGER NOT NULL DEFAULT 0,
    "budgetCategoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "BudgetSubcategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BudgetSubcategory_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "BudgetCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BudgetSubcategory" ("amount", "budgetCategoryId", "id", "remaining", "title", "type", "used") SELECT "amount", "budgetCategoryId", "id", "remaining", "title", "type", "used" FROM "BudgetSubcategory";
DROP TABLE "BudgetSubcategory";
ALTER TABLE "new_BudgetSubcategory" RENAME TO "BudgetSubcategory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
