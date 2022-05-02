import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getStudentByAuthUserId(authUserId: string) {
    return await this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  listAllStudents() {
    return this.prisma.student.findMany();
  }

  async findStudentById(id: string) {
    return await this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }
}
