import { NextFunction, Request, Response } from 'express';
import { studentModel } from '../models/student';
import { teacherModel } from '../models/teacher';

class StudentController {
    public async createStudent(req:Request, res:Response, next:NextFunction) {
        try {
            const newStudent = await studentModel.create(req.body);

            res.json(newStudent);
        } catch (e) {
            next(e);
        }
    }

    public async getStudents(req:Request, res:Response, next:NextFunction) {
        try {
            const students = await studentModel.find({}).populate('teacher');

            res.json(students);
        } catch (e) {
            next(e);
        }
    }

    public async createTeacher(req:Request, res:Response, next:NextFunction) {
        try {
            const newTeacher = await teacherModel.create(req.body);

            res.json(newTeacher);
        } catch (e) {
            next(e);
        }
    }

    public async updateStudent(req:Request, res:Response, next:NextFunction) {
        try {
            const { studentId } = req.params as any;
            const students = await studentModel.findOneAndUpdate(
                studentId,
                { teacher: '6256f5b24dbe652290de7aa5' },
                { new: true },
            );

            res.json(students);
        } catch (e) {
            next(e);
        }
    }
}

export const studentConroller = new StudentController();
