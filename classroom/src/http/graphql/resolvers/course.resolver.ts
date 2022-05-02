import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthorizationGuard } from 'http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'http/auth/current-user';
import { CreateCourseInput } from 'http/input/create-course.input';
import { CourseService } from 'http/service/course.service';
import { EnrollmentService } from 'http/service/enrollment.service';
import { StudentService } from 'http/service/student.service';
import { Course } from '../model/course';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ) {}

  @Query(() => [Course])
  courses() {
    return this.courseService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.getStudentByAuthUserId(user.sub);

    if (!student) throw new Error('student not found!');

    const enrollment = await this.enrollmentService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) throw new UnauthorizedException();

    return this.courseService.findCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.courseService.CreateCouse({ title: data.title });
  }
}
