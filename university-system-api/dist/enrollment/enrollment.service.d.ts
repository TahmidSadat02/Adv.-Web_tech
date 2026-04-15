import { CourseService } from '../course/course.service';
import { NotificationService } from '../notification/notification.service';
export declare class EnrollmentService {
    private courseService;
    private notificationService;
    constructor(courseService: CourseService, notificationService: NotificationService);
    enrollStudent(studentName: string, courseId: string): {
        message: string;
        student: string;
        course: {
            message: string;
            id: string;
        };
        notification: {
            studentName: string;
            message: string;
        };
    };
    getEnrollments(): {
        message: string;
        data: never[];
    };
}
