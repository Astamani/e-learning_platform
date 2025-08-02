// src/lesson-completions/dto/create-lesson-completion.dto.ts
import { IsString } from 'class-validator';

export class CreateLessonCompletionDto {
  @IsString()
  studentId: string;

  @IsString()
  courseId: string;

  @IsString()
  lessonId: string;
}
