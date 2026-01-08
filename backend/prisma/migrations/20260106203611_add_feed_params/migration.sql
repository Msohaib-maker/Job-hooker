-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('Fixed', 'Hourly');

-- AlterTable
ALTER TABLE "JobFeed" ADD COLUMN     "platforms" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "salaryType" "SalaryType" NOT NULL DEFAULT 'Fixed';
