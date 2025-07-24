-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sortBoardsBy" TEXT DEFAULT 'created_desc',
ADD COLUMN     "sortNotesBy" TEXT DEFAULT 'created_desc';
