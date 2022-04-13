import mongoose from 'mongoose';

import { teacherModel } from './teacher';

const { Schema, model } = mongoose;

const studentSchema = new Schema({
    nameStudent: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teacherModel,
    },

}, {
    timestamps: true, // createdAt,updateAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// studentSchema.virtual('fullName').get(function () { // toJson & toObject need to do this
//     // @ts-ignore
//     return `${this.nameStudent}   'Shevchenko'`;
// });

export const studentModel = model('student', studentSchema);
