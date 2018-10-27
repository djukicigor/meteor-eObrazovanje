import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';

import { Exams } from '../exams.js';
import { Subjects } from '../../subjects/subjects.js';

Meteor.publish('passing.exams', function passingExams() {
    if (!this.userId) {
        return this.ready();
    }

    let subjectIds = [];
    if (Roles.userIsInRole(this.userId, ['admin'], 'main')) {
        return Exams.find({}, {
            fields: {
                date: 1,
                subject: 1,
                students: 1
            }
        })
    }
    if (Roles.userIsInRole(this.userId, ['teacher'], 'main')) {
        const subjects = Subjects.find({
            lecturers: this.userId
        }).fetch();
        subjects.forEach(sub => subjectIds.push(sub._id));
    } else {
        const subjects = Subjects.find({
            students: this.userId,
        }).fetch();
        subjects.forEach(sub => subjectIds.push(sub._id));
    }

    return Exams.find({
        subject: { $in: subjectIds }
    }, {
            fields: {
                date: 1,
                subject: 1,
                students: 1
            }
        })
})

Meteor.publish('results', function results() {
    if (!this.userId) {
        return this.ready();
    }

    let subjectIds = [];
    const subjects = Subjects.find({
        students: this.userId,
    }).fetch();
    subjects.forEach(sub => subjectIds.push(sub._id));

    return Exams.find({
        subject: { $in: subjectIds }
    }, {
            fields: {
                date: 1,
                subject: 1,
                students: 1
            }
        })
})