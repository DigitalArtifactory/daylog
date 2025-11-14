-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "notesId" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_notesId_fkey" FOREIGN KEY ("notesId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
