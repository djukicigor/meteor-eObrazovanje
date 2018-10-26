import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';

import { Transactions } from '../../api/transactions/transactions.js';
import { Subjects } from '../../api/subjects/subjects.js';
import { Exams } from '../../api/exams/exams.js';

// Import needed templates
import '../../ui/layouts/body/body.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, qs, subjects) {
    this.render('App_body', 'App_home', { subjects });
  },
  waitOn() {
    return [import('../../ui/pages/home/home.js'), Meteor.subscribe('subjects')];
  },
  data() {
    return Subjects.find({}).fetch()
  }
});

FlowRouter.route('*', {
  name: 'App.notFound',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    this.render('App_notFound');
  },
  waitOn() {
    return import('../../ui/pages/not-found/not-found.js');
  },
});

FlowRouter.route('/login', {
  name: 'App.login',
  triggersEnter: [(context, redirect) => {
    if (Meteor.userId()) {
      redirect('App.home');
    }
  }],
  action() {
    this.render('App_login')
  },
  waitOn() {
    return import('../../ui/pages/login/login.js');
  },
})

FlowRouter.route('/transactions', {
  name: 'App.transactions',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, qs, data) {
    this.render('App_body', 'App_transactions', { data });
  },
  waitOn() {
    return [import('../../ui/pages/transactions/transactions.js'), Meteor.subscribe('transactions'), Meteor.subscribe('all.students')];
  },
  data() {
    const students = Meteor.users.find({ 'roles.main': 'student' }).fetch();
    const transactions = Transactions.find({}).fetch();
    return { students, transactions };
  }
});

FlowRouter.route('/passing', {
  name: 'App.passingExams',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, qs, subjects) {
    this.render('App_body', 'App_subjects', { subjects });
  },
  waitOn() {
    return [import('../../ui/pages/subjects/subjects.js'), Meteor.subscribe('subjects'), Meteor.subscribe('passing.exams')];
  },
  data() {
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
    return passingExams;
  }
});

FlowRouter.route('/results', {
  name: 'App.results',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, qs, subjects) {
    this.render('App_body', 'App_subjects', { subjects });
  },
  waitOn() {
    return [import('../../ui/pages/subjects/subjects.js'), Meteor.subscribe('subjects'), Meteor.subscribe('results')];
  },
  data() {
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

    return passedExams;
  }
})

FlowRouter.route('/lecture-exams', {
  name: 'App.lectures',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, qs, subjects) {
    this.render('App_body', 'App_lectures', { subjects });
  },
  waitOn() {
    return[import('../../ui/pages/lectures/lectures.js'), Meteor.subscribe('subjects'), Meteor.subscribe('passing.exams')];
  },
  data() {
    let passingExams = [];
    const exams = Exams.find({}).fetch();
    const subjects = Subjects.find({}).fetch();
    exams.forEach(exam => {
      const s = Subjects.findOne({ _id: exam.subject });
      s.date = exam.date;
      s.examId = exam._id;
      passingExams.push(s);
    })
    return { passingExams, subjects };
  }
})

FlowRouter.route('/lecture-exam/:_id', {
  name: 'App.lecturesResults',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, qs, students) {
    this.render('App_body', 'App_lecturesResults', {students})
  },
  waitOn() {
    return[import('../../ui/pages/lectures/lecturesResults.js'), Meteor.subscribe('all.users'), Meteor.subscribe('passing.exams')]
  },
  data(params) {
    const exam = Exams.findOne({ _id: params._id })
    const students = [];
    if (exam.students) {
      exam.students.forEach(student => {
        students.push(student.studentId);
      })
    }
    return Meteor.users.find({ _id: { $in:students } }).fetch()
  }
})

FlowRouter.route('/subjects/:_id', {
  name: 'App.subject',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, qs, subject) {
    this.render('App_body', 'App_subject', { subject });
  },
  waitOn(params) {
    return [import('../../ui/pages/subjects/subject.js'), Meteor.subscribe('subject', params._id)];
  },
  data(params) {
    return Subjects.findOne({ _id: params._id });
  }
});

FlowRouter.route('/subjects/:_id/edit', {
  name: 'App.subjectEdit',
  triggersEnter: [AccountsTemplates.ensureSignedIn, (context, redirect, stop, subject) => {
    if (!Roles.userIsInRole(Meteor.userId(), ['teacher'], subject._id) && !Roles.userIsInRole(Meteor.userId(), ['admin'], 'main')) {
      redirect('/not-authorised');
    }
  }],
  action(params, qs, subject) {
    this.render('App_body', 'App_subjectEdit', { subject });
  },
  waitOn(params) {
    return [import('../../ui/pages/subjects/subjectEdit.js'), Meteor.subscribe('subject', params._id)];
  },
  data(params) {
    return Subjects.findOne({ _id: params._id });
  }
});

FlowRouter.route('/users', {
  name: 'App.users',
  triggersEnter: [AccountsTemplates.ensureSignedIn, (context, redirect, stop, subject) => {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'main')) {
      redirect('/not-authorised');
    }
  }],
  action(params, qs, users) {
    this.render('App_body', 'App_users', { users });
  },
  waitOn() {
    return [import('../../ui/pages/users/users.js'), Meteor.subscribe('all.users')];
  },
  data() {
    return Meteor.users.find({ 'roles.main': { $in: ['student', 'teacher'] }}).fetch()
  }
})