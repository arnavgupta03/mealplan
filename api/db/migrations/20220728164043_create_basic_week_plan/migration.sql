-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "foodItemId" TEXT,
    CONSTRAINT "Ingredient_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FoodItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dayPlanId" TEXT,
    CONSTRAINT "FoodItem_dayPlanId_fkey" FOREIGN KEY ("dayPlanId") REFERENCES "DayPlan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DayPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" INTEGER NOT NULL,
    "weekPlanId" TEXT,
    CONSTRAINT "DayPlan_weekPlanId_fkey" FOREIGN KEY ("weekPlanId") REFERENCES "WeekPlan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeekPlan" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_foodItemId_key" ON "Ingredient"("name", "foodItemId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItem_name_dayPlanId_key" ON "FoodItem"("name", "dayPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "DayPlan_day_weekPlanId_key" ON "DayPlan"("day", "weekPlanId");
