import { PartialType } from '@nestjs/mapped-types'; // [cite: 135]
import { CreateCourseDto } from './create-course.dto'; // [cite: 135]

export class UpdateCourseDto extends PartialType(CreateCourseDto) {} // [cite: 137]