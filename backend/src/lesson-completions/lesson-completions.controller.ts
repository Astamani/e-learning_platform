// src/lesson-completions/lesson-completions.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LessonCompletionsService } from './lesson-completions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('lesson-completions')
export class LessonCompletionsController {
  constructor(
    private readonly lessonCompletionsService: LessonCompletionsService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post(':courseId/:lessonId')
  async completeLesson(
    @Request() req,
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    const studentId = req.user.userId; // from JWT
    return this.lessonCompletionsService.completeLesson(
      studentId,
      courseId,
      lessonId,
    );
  }

  @Get(':courseId')
  async getCompletedLessons(
    @Request() req,
    @Param('courseId') courseId: string,
  ) {
    const studentId = req.user.userId;
    return this.lessonCompletionsService.getCompletedLessons(
      studentId,
      courseId,
    );
  }
}
