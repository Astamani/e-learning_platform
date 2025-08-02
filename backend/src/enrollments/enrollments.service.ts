import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async enroll(studentId: string, courseId: string) {
    // Check for duplicate
    const existing = await this.prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Already enrolled');
    }

    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });
  }

  async getAll() {
    return this.prisma.enrollment.findMany({
      include: {
        student: true,
        course: true,
      },
    });
  }
}
