-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('remote', 'on_site');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "company" TEXT,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cookie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "path" TEXT,
    "expires" TIMESTAMP(3),
    "httpOnly" BOOLEAN DEFAULT false,
    "secure" BOOLEAN DEFAULT false,
    "sameSite" TEXT DEFAULT 'Lax',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cookie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobFeed" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "exp" TEXT NOT NULL,
    "type" "JobType" NOT NULL,
    "location" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "JobFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telegram_handle" TEXT,
    "email_handler" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Job_title_idx" ON "Job"("title");

-- CreateIndex
CREATE INDEX "Job_location_idx" ON "Job"("location");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "JobFeed" ADD CONSTRAINT "JobFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
