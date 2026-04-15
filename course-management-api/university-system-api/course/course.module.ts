import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
