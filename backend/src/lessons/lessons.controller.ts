import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post(':courseId')
  create(@Param('courseId') courseId: string, @Body() dto: CreateLessonDto) {
    return this.lessonsService.createLesson(courseId, dto);
  }

  @Get('course/:courseId')
  getByCourse(@Param('courseId') courseId: string) {
    return this.lessonsService.getLessonsByCourse(courseId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.lessonsService.updateLesson(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.lessonsService.deleteLesson(id);
  }
}
