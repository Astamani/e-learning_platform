import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { EnrollCourseDto } from './dto/enroll-course.dto';

@Controller('enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.STUDENT)
export class EnrollmentsController {
  constructor(private enrollmentService: EnrollmentsService) {}

  @Post()
  async enrollStudent(@Body() body: { studentId: string; courseId: string }) {
    return this.enrollmentService.enroll(body.studentId, body.courseId);
  }
  @Get()
  getAllEnrollments() {
    return this.enrollmentService.getAll();
  }
}
