import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

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