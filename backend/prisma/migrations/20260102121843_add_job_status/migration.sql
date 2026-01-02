-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");
