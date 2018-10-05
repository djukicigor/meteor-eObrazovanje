import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';

import { Exams } from './exams.js';

const applyExam = new ValidatedMethod({
    name: 'applyExam',
    validate: new SimpleSchema({
        subjectId: { type: String, regEx: SimpleSchema.RegEx.Id },
        examId: { type: String, regEx: SimpleSchema.RegEx.Id },
    }).validator({ clean: true }),
    run({ subjectId, examId }) {
        if (!Roles.userIsInRole(this.userId, ['student'], subjectId)) {
            throw new Meteor.Error(403, "Access denied")
        }

        return Exams.update({ _id: examId }, {
            $push: {
                students: { studentId: this.userId },
            }
        });
    },
})

const makeExam = new ValidatedMethod({
    name: 'makeExam',
    validate: new SimpleSchema({
        subjectId: { type: String, regEx: SimpleSchema.RegEx.Id },
        date: { type: Date },
    }).validator(),
    run ({ subjectId, date }) {
        if (!Roles.userIsInRole(this.userId, ['teacher'], subjectId) && !Roles.userIsInRole(this.userId, ['admin'], 'main')) {
            throw new Meteor.Error(403, "Access denied")
        }

        if (date < new Date()) {
            throw new Meteor.Error(400, "Set the date in the future");
        }

        return Exams.insert({
            subject: subjectId,
            date,
        })
    }
})

const setResult = new ValidatedMethod({
    name: 'setResult',
    validate: new SimpleSchema({
        examId: { type: String, regEx: SimpleSchema.RegEx.Id },
        studentId: { type: String, regEx: SimpleSchema.RegEx.Id },
        result: { type: Number },
    }).validator(),
    run({ examId, studentId, result }) {
        if (!Roles.userIsInRole(this.userId, ['teacher'], 'main') && !Roles.userIsInRole(this.userId, ['admin'], 'main')) {
            throw new Meteor.Error(403, "Access denied")
        }

        const exam = Exams.findOne({ _id: examId });
        exam.students.forEach(student => {
            if (student.studentId === studentId) {
                student.result = result;
            }
        });
        return Exams.update({ _id: examId }, {
            $set: {
                students: exam.students
            }
        })
    }
})