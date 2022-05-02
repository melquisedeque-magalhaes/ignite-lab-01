import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from '../database/database.module';
import { CourseResolver } from './graphql/resolvers/course.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentResolver } from './graphql/resolvers/student.resolver';
import { CourseService } from './service/course.service';
import { EnrollmentService } from './service/enrollment.service';
import { StudentService } from './service/student.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    StudentResolver,
    CourseResolver,
    EnrollmentResolver,

    // Services
    CourseService,
    StudentService,
    EnrollmentService,
  ],
})
export class HttpModule {}
