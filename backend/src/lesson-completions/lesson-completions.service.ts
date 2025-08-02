// src/lesson-completions/lesson-completions.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonCompletionsService {
  constructor(private prisma: PrismaService) {}

  async completeLesson(studentId: string, courseId: string, lessonId: string) {
    // Check if lesson belongs to course (optional but safe)
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson || lesson.courseId !== courseId) {
      throw new NotFoundException('Lesson does not belong to the given course');
    }
    // 1. Get the lesson with prerequisites
    const lessonWithPrereqs = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        prerequisites: true, // self relation
      },
    });

    // 2. If lesson has prerequisites, check if student completed them
    const requiredLessons = lessonWithPrereqs?.prerequisites ?? [];

    if (requiredLessons.length > 0) {
      const completedLessons = await this.prisma.lessonCompletion.findMany({
        where: {
          studentId,
          lessonId: {
            in: requiredLessons.map((lesson) => lesson.id),
          },
        },
        select: { lessonId: true },
      });

      const completedLessonIds = completedLessons.map((l) => l.lessonId);

      const uncompleted = requiredLessons.filter(
        (lesson) => !completedLessonIds.includes(lesson.id),
      );

      if (uncompleted.length > 0) {
        throw new BadRequestException(
          `You must complete all prerequisite lessons before completing this one.`,
        );
      }
    }

    return this.prisma.lessonCompletion.upsert({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId,
        },
      },
      update: {},
      create: {
        studentId,
        courseId,
        lessonId,
      },
    });
  }

  async getCompletedLessons(studentId: string, courseId: string) {
    return this.prisma.lessonCompletion.findMany({
      where: {
        studentId,
        courseId,
      },
      select: {
        lessonId: true,
        completedAt: true,
      },
    });
  }
}
