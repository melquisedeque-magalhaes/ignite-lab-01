import { UseGuards } from '@nestjs/common';
import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'http/service/student.service';
import { AuthorizationGuard } from 'http/auth/authorization.guard';
import { Student } from '../model/student';
import { EnrollmentService } from 'http/service/enrollment.service';
import { AuthUser, CurrentUser } from 'http/auth/current-user';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.studentService.getStudentByAuthUserId(user.sub);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentService.listEnrollmentsByStudent(student.id);
  }

  // @Mutation(() => Student)
  // @UseGuards(AuthorizationGuard)
  // createStudent() {
  //   return this.studentService.createStudent();
  // }
}
