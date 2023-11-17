-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BudgetCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "used" INTEGER NOT NULL DEFAULT 0,
    "remaining" INTEGER NOT NULL DEFAULT 0,
    "month" TEXT NOT NULL DEFAULT 'January',
    "userId" TEXT NOT NULL,
    CONSTRAINT "BudgetCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BudgetCategory" ("amount", "id", "title", "type", "userId") SELECT "amount", "id", "title", "type", "userId" FROM "BudgetCategory";
DROP TABLE "BudgetCategory";
ALTER TABLE "new_BudgetCategory" RENAME TO "BudgetCategory";
CREATE TABLE "new_BudgetSubcategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "used" INTEGER NOT NULL DEFAULT 0,
    "remaining" INTEGER NOT NULL DEFAULT 0,
    "budgetCategoryId" TEXT NOT NULL,
    CONSTRAINT "BudgetSubcategory_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "BudgetCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BudgetSubcategory" ("amount", "budgetCategoryId", "id", "title", "type") SELECT "amount", "budgetCategoryId", "id", "title", "type" FROM "BudgetSubcategory";
DROP TABLE "BudgetSubcategory";
ALTER TABLE "new_BudgetSubcategory" RENAME TO "BudgetSubcategory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
