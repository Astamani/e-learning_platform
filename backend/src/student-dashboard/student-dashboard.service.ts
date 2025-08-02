import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentDashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData(studentId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            lessons: {
              select: { id: true, title: true },
            },
          },
        },
      },
    });

    const dashboardData = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = enrollment.course;
        const totalLessons = course.lessons.length;

        const completedLessons = await this.prisma.lessonCompletion.findMany({
          where: {
            studentId,
            courseId: course.id,
          },
          select: { lessonId: true },
        });

        const completedCount = completedLessons.length;
        const progress =
          totalLessons > 0
            ? Math.round((completedCount / totalLessons) * 100)
            : 0;

        // Optional: get next lesson
        const nextLesson = course.lessons.find(
          (lesson) => !completedLessons.some((cl) => cl.lessonId === lesson.id),
        );

        return {
          courseId: course.id,
          courseTitle: course.title,
          totalLessons,
          completedLessons: completedCount,
          progress,
          nextLesson: nextLesson
            ? {
                id: nextLesson.id,
                title: nextLesson.title,
              }
            : null,
        };
      }),
    );

    return dashboardData;
  }
}
