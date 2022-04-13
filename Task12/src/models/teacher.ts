import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const teacherSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        trim: true,
    },
}, {
    timestamps: true, // createdAt,updateAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

export const teacherModel = model('teacher', teacherSchema);
