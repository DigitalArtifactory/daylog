-- AlterTable
ALTER TABLE "User" ADD COLUMN     "failedAttempts" INTEGER DEFAULT 0,
ADD COLUMN     "lockUntil" TIMESTAMP(3);
