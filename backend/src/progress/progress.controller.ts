import { Controller, Patch, Get, Body, Param } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Patch(':studentId/:courseId')
  updateProgress(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
    @Body('progress') progress: number,
  ) {
    return this.progressService.updateProgress(studentId, courseId, progress);
  }

  @Get(':studentId/:courseId')
  getProgress(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.progressService.getProgress(studentId, courseId);
  }
}
