/*
  Warnings:

  - Added the required column `quantity` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `WeekPlan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "foodItemId" TEXT,
    CONSTRAINT "Ingredient_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ingredient" ("foodItemId", "id", "name") SELECT "foodItemId", "id", "name" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE UNIQUE INDEX "Ingredient_name_foodItemId_key" ON "Ingredient"("name", "foodItemId");
CREATE TABLE "new_WeekPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_WeekPlan" ("id") SELECT "id" FROM "WeekPlan";
DROP TABLE "WeekPlan";
ALTER TABLE "new_WeekPlan" RENAME TO "WeekPlan";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
