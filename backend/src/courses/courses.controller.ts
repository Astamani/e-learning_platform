import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Patch,
  Param,
  Req,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCourseDto } from './dto/update-course.dto';

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Post()
  createCourse(@Body() dto: CreateCourseDto, @Req() req: any) {
    const instructorId = req.user.userId;
    return this.coursesService.createCourse(dto, instructorId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.INSTRUCTOR)
  updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, dto);
  }

  @Get()
  getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }
}
