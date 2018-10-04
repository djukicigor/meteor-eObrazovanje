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