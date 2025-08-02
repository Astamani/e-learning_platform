import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { PrismaService } from './../prisma/prisma.service';
import { EnrollmentsController } from './enrollments.controller';

@Module({
  providers: [EnrollmentsService, PrismaService],
  controllers: [EnrollmentsController],
})
export class EnrollmentsModule {}
