/*
  Warnings:

  - A unique constraint covering the columns `[telegram_one_time_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_one_time_code_key" ON "User"("telegram_one_time_code");
