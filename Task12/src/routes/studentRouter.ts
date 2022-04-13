import { Router } from 'express';

import { studentConroller } from '../controllers/studentController';

const router = Router();

router.post('/', studentConroller.createStudent);
router.get('/', studentConroller.getStudents);
router.post('/teacher', studentConroller.createTeacher);
router.patch('/studentId', studentConroller.updateStudent);

export const studentRouter = router;
