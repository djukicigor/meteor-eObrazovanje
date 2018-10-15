import { Meteor } from 'meteor/meteor';
import { Exams } from '../../../api/exams/exams.js';
import { Subjects } from '../../../api/subjects/subjects.js';
import { _ } from 'meteor/underscore';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


import './subjects.html';

Template.App_subjects.onCreated(function subjects() {
    const route = FlowRouter.current().route.name;
    this.searchString = new ReactiveVar('');
    this.subjects = new ReactiveVar(this.data.subjects);
    if (route === 'App.passingExams') {
        let sub = Meteor.subscribe('subjects');
        let exa = Meteor.subscribe('passing.exams');
        this.autorun(() => {
            if (sub.ready() && exa.ready()) {
                let passingExams = [];
                const exams = Exams.find({}, { sort: { date: -1 } }).fetch();
                const passedExams = [];
                exams.forEach(exam => {
                const studentResults = _.findWhere(exam.students, { studentId: Meteor.userId() });
                const subject = Subjects.findOne({ _id: exam.subject })
                if (subject && exam.date > new Date() && !studentResults) {
                    subject.date = exam.date;
                    subject.examId = exam._id;
                    passingExams.push(subject);
                } else if (subject && !Roles.userIsInRole(Meteor.userId(), ['student'], 'main')) {
                    subject.date = exam.date;
                    passingExams.push(subject);
                }
                if ((studentResults || {}).result > 5) {
                    passedExams.push(subject)
                }
                })
                passedExams.forEach((passedExam) => {
                passingExams = _.reject(passingExams, (passingExam) => {
                    return passingExam._id === passedExam._id;
                });
                })
                this.subjects.set(passingExams);
            }
        })
    } else if (route === 'App.results') {
        let sub = Meteor.subscribe('subjects');
        let exa = Meteor.subscribe('results');
        this.autorun(() => {
            const exams = Exams.find({}, { sort: { date: -1 } }).fetch();
            const passedExams = [];
            exams.forEach(exam => {
            const studentResults = _.findWhere(exam.students, { studentId: Meteor.userId() });
            const subject = Subjects.findOne({ _id: exam.subject })
            if ((studentResults || {}).result > 5) {
                subject.date = exam.date;
                subject.result = studentResults.result;
                passedExams.push(subject)
            }
            })

            this.subjects.set(passedExams);
        })
    }
});

Template.App_subjects.events({
    'click #js-apply': function (event, template) {
        const examId = event.currentTarget.getAttribute('examId');
        const subjectId = event.currentTarget.getAttribute('subjectId');
        event.currentTarget.classList.add('loading');
        Meteor.call('applyExam', { subjectId, examId }, (err, data) => {
            event.currentTarget.classList.remove('loading', 'primary');
            if (err) {
                event.currentTarget.innerHTML = "Error";
                event.currentTarget.classList.add('negative');
                throw new Meteor.Error(500, err)
            }
            event.currentTarget.innerHTML = "Applied";
            event.currentTarget.classList.add('positive');
        })
    },
    'keyup #js-search': (event, templateInstance) => {
        if (event.currentTarget.value.length > 2) {
            templateInstance.searchString.set(event.currentTarget.value)
        } else {
            templateInstance.searchString.set('')
        }
    }
});

Template.App_subjects.helpers({
    subjects: () => {
        return Template.instance().subjects.get().filter(i => {
            let reg = new RegExp(Template.instance().searchString.get(), 'i')
            return reg.test(i.title) || reg.test(i.description)
        })
    },
});