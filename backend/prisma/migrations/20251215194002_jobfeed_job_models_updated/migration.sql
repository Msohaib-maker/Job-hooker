-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "salaryCurrency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "tags" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "JobFeed" ADD COLUMN     "salaryCurrency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "tags" TEXT NOT NULL DEFAULT '';
