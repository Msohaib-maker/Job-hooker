-- AlterTable
ALTER TABLE "JobFeed" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "JobFeed" ADD CONSTRAINT "JobFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
