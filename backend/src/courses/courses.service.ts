import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
// import { UpdateCourseDto } from './dto/update-course.dto';
// import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(dto: CreateCourseDto, instructorId: string) {
    return this.prisma.course.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        instructor: {
          connect: {
            id: instructorId,
          },
        },
        prerequisites: {
          connect: dto.prerequisiteIds?.map((id) => ({ id })) || [],
        },
      },
      include: {
        prerequisites: true,
        instructor: true,
      },
    });
  }

  async updateCourse(id: string, dto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        prerequisites: dto.prerequisiteIds
          ? {
              set: dto.prerequisiteIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        prerequisites: true,
      },
    });
  }
  async getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        prerequisites: true,
      },
    });
  }
  async getAllCourses() {
    return this.prisma.course.findMany();
  }
}
