import { Controller, Get, Param, Patch, Post, Put, Delete, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('course')
export class CourseController {

    constructor(private readonly courseService: CourseService) {}

    @Get()
    getAllCourses() {
        return this.courseService.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id') id: string) {
        return this.courseService.getCourseById(id);
    }

    @Post()
    createCoruse(@Body() dto: CreateCourseDto) {
        return this.courseService.createCourse(dto);
    }

    @Put(':id')
    updateCourse(@Param('id') id: string , @Body() dto: UpdateCourseDto) {
        return this.courseService.updateCourse(id, dto);
    }

    @Patch(':id')
    patchCourse(@Param('id') id: string , @Body() dto: UpdateCourseDto) {
        return this.courseService.patchCourse(id, dto);
    }

    @Delete(':id')
    deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }

    @Post(':id/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + '-' + file.originalname);
            }
        }),
        limits: { fileSize: 2 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
                return cb(new BadRequestException('Only .jpg, .jpeg, .png, .pdf files are allowed!'), false);
            }
            cb(null, true);
        }
    }))
    uploadCourseMaterial(
        @Param('id') id: string, 
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        return this.courseService.uploadCourseMaterial(id, file);
    }
}
