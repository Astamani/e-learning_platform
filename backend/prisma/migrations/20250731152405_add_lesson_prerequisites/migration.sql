-- CreateTable
CREATE TABLE "_LessonPrerequisites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LessonPrerequisites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LessonPrerequisites_B_index" ON "_LessonPrerequisites"("B");

-- AddForeignKey
ALTER TABLE "_LessonPrerequisites" ADD CONSTRAINT "_LessonPrerequisites_A_fkey" FOREIGN KEY ("A") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonPrerequisites" ADD CONSTRAINT "_LessonPrerequisites_B_fkey" FOREIGN KEY ("B") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
