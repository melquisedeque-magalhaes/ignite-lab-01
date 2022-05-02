import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';

interface getByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async getByCourseAndStudentId({
    courseId,
    studentId,
  }: getByCourseAndStudentIdParams) {
    return await this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
      },
    });
  }

  async listAllEnrollment() {
    return await this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        canceledAt: 'desc',
      },
    });
  }

  async listEnrollmentsByStudent(studentId: string) {
    return await this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
