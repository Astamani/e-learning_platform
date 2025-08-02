import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  createLesson(courseId: string, dto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: {
        ...dto,
        courseId,
      },
    });
  }

  getLessonsByCourse(courseId: string) {
    return this.prisma.lesson.findMany({ where: { courseId } });
  }

  updateLesson(id: string, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data: dto });
  }

  deleteLesson(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
