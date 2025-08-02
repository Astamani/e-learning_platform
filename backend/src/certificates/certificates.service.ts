import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async checkEligibility(
    studentId: string,
    courseId: string,
  ): Promise<boolean> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: { lessons: true },
    });

    if (!course) return false;

    const completed = await this.prisma.lessonCompletion.findMany({
      where: {
        studentId,
        courseId,
      },
    });

    return completed.length === course.lessons.length;
  }

  async generatePDF(
    studentId: string,
    courseId: string,
  ): Promise<NodeJS.ReadableStream> {
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
    });

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!student || !course) {
      throw new Error('Student or Course not found');
    }

    const doc = new PDFDocument();
    const stream = new PassThrough();
    doc.pipe(stream);

    doc
      .fontSize(24)
      .text('Certificate of Completion', { align: 'center' })
      .moveDown(2);

    doc
      .fontSize(16)
      .text(`This certifies that`, { align: 'center' })
      .moveDown();

    doc
      .fontSize(20)
      .text(`${student.name}`, { align: 'center', underline: true })
      .moveDown();

    doc
      .fontSize(16)
      .text(`has successfully completed the course`, { align: 'center' })
      .moveDown();

    doc
      .fontSize(20)
      .text(`${course.title}`, { align: 'center', underline: true })
      .moveDown();

    doc
      .fontSize(12)
      .text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' });

    doc.end();
    return stream;
  }
}
