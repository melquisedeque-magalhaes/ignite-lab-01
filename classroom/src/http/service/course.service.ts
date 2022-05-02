import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import slugify from 'slugify';
import { EnrollmentService } from './enrollment.service';
import { StudentService } from './student.service';

interface CreateCouseParams {
  title: string;
}

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  async findCourseById(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async CreateCouse({ title }: CreateCouseParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadyExists) throw new Error('Course Already Exists');

    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
