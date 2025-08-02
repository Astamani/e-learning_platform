import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CertificatesService } from './certificates.service';
import { Response } from 'express';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':courseId')
  async generateCertificate(
    @Param('courseId') courseId: string,
    @Req() req,
    @Res() res: Response,
  ) {
    const studentId = req.user.userId;

    const isEligible = await this.certificatesService.checkEligibility(
      studentId,
      courseId,
    );

    if (!isEligible) {
      throw new NotFoundException(
        'You have not completed all lessons for this course.',
      );
    }

    const stream = await this.certificatesService.generatePDF(
      studentId,
      courseId,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=certificate.pdf',
    });

    stream.pipe(res);
  }
}
