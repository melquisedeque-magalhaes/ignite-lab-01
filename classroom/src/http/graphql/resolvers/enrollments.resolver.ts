import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'http/auth/authorization.guard';
import { CourseService } from 'http/service/course.service';
import { EnrollmentService } from 'http/service/enrollment.service';
import { StudentService } from 'http/service/student.service';

import { Enrollment } from '../model/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentService.listAllEnrollment();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentService.findStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.courseService.findCourseById(enrollment.courseId);
  }
}
