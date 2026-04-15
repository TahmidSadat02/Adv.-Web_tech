import { Inject, Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { forwardRef } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { get } from 'http';

@Injectable()
export class EnrollmentService {

    constructor(
        private courseService: CourseService,
        @Inject(forwardRef(() => NotificationService))
        private notificationService: NotificationService,

    ) {}
    enrollStudent(studentName: string, courseId: string) {
        const course = this.courseService.getCourseById(courseId);
        const notification = this.notificationService.sendNotification(studentName, 'Welcome to the course!');

        return {
            message: 'Student enrolled successfully',
            student: studentName,
            course: course,
            notification: notification
        };
    }

    getEnrollments() {
    return { message: 'All enrollments fetched', data: [] };
  }
}
