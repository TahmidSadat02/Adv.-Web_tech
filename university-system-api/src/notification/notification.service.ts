import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class NotificationService {

    constructor(
        @Inject(forwardRef(() => EnrollmentService))
        private enrollmentService: EnrollmentService,
    ) {}

    sendNotification(studentName: string, message: string) {
        return { studentName, message };
    }

    checkEnrollmentAndNotify(studentName: string, courseId: string) {
        const enrollments = this.enrollmentService.getEnrollments();
        return {
            message: 'Checked enrollments and sent notification',
            studentName,
            courseId,
            enrollmentData: enrollments
        };  
    }
}
