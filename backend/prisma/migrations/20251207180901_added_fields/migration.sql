-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "experience" TEXT,
ADD COLUMN     "salary" INTEGER,
ADD COLUMN     "type" "JobType" NOT NULL DEFAULT 'remote';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "telegram_one_time_code" TEXT;
