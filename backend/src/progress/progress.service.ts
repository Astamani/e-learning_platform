import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async updateProgress(studentId: string, courseId: string, progress: number) {
    return this.prisma.enrollment.update({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
      data: {
        progress,
        completed: progress >= 100,
      },
    });
  }

  async getProgress(studentId: string, courseId: string) {
    return this.prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
      select: {
        progress: true,
        completed: true,
      },
    });
  }
}
