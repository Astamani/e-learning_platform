import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentDashboardService } from './student-dashboard.service';

@Controller('dashboard')
export class StudentDashboardController {
  constructor(private readonly dashboardService: StudentDashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDashboard(@Request() req) {
    const studentId = req.user.userId;
    return this.dashboardService.getDashboardData(studentId);
  }
}
