import { Module } from '@nestjs/common';
import { LessonCompletionsService } from './lesson-completions.service';
import { LessonCompletionsController } from './lesson-completions.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LessonCompletionsService, PrismaService],
  controllers: [LessonCompletionsController],
})
export class LessonCompletionsModule {}
