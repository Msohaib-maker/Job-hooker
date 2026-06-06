-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('Upwork', 'Upwork_Inc', 'YC', 'Y_Combinator', 'Fiverr');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "platform" "Platform";
