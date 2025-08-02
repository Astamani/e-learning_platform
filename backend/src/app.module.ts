import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ProgressModule } from './progress/progress.module';
import { LessonCompletionsModule } from './lesson-completions/lesson-completions.module';
import { LessonsModule } from './lessons/lessons.module';
import { StudentDashboardModule } from './student-dashboard/student-dashboard.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    CoursesModule,
    EnrollmentsModule,
    ProgressModule,
    LessonCompletionsModule,
    LessonsModule,
    StudentDashboardModule,
    CertificatesModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Protect all routes by default
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
