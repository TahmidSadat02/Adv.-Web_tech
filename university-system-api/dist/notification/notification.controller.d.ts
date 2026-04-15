import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
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
