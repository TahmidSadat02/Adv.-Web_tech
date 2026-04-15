import { EnrollmentService } from '../enrollment/enrollment.service';
export declare class NotificationService {
    private enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    sendNotification(studentName: string, message: string): {
        studentName: string;
        message: string;
    };
    checkEnrollmentAndNotify(studentName: string, courseId: string): {
        message: string;
        studentName: string;
        courseId: string;
        enrollmentData: {
            message: string;
            data: never[];
        };
    };
}
