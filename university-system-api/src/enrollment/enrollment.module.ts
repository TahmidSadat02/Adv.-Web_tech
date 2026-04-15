import { forwardRef, Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { NotificationService } from '../notification/notification.service';
import { CourseService } from '../course/course.service';
import { NotificationModule } from '../notification/notification.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    CourseModule,
    forwardRef(() => NotificationModule), 
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
