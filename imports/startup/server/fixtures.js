// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../api/transactions/transactions.js';
import { Subjects } from '../../api/subjects/subjects.js';
import { Exams } from '../../api/exams/exams.js';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
  if (Transactions.find().count() === 0) {
    const data = [
      {
        amount: 1500,
        student: 'qqNCKYEWxydhr3FAo',
        createdAt: new Date(),
      },
      {
        amount: 23000,
        student: 'qqNCKYEWxydhr3FAo',
        createdAt: new Date(),
      },
      {
        amount: 12000,
        url: 'ewhFrcpmzRpa4fFit',
        createdAt: new Date(),
      },
      {
        amount: 20000,
        url: 'ewhFrcpmzRpa4fFit',
        createdAt: new Date(),
      },
    ];

    data.forEach(transaction => Transactions.insert(transaction));
  }
  if (Subjects.find().count() === 0) {
    const data = [
      {
        title: 'Srpski',
        description: 'Srpski jezik i književnost.',
        students: ['qqNCKYEWxydhr3FAo', 'ewhFrcpmzRpa4fFit'],
        lecturers: ['irDc9ZHA8JZWZmubY']
      },
      {
        title: 'Matematika',
        description: 'Izvodi i integrali.',
        students: ['qqNCKYEWxydhr3FAo'],
        lecturers: ['irDc9ZHA8JZWZmubY', 'nevjyFi548RYTeRwK']
      },
      {
        title: 'Informatika',
        description: 'Informatika i računarstvo',
        students: ['ewhFrcpmzRpa4fFit'],
        lecturers: ['nevjyFi548RYTeRwK']
      },
    ];

    data.forEach(subject => Subjects.insert(subject));
  }

  if (Exams.find().count() === 0) {
    const data = [
      {
        subject: 'grFewZCxFmb4YTxhm',
        results: [
          { studentId: 'qqNCKYEWxydhr3FAo', result: 5 },
          { studentId: 'ewhFrcpmzRpa4fFit', result: 8 }
        ],
        date: new Date(new Date() + 50)
      },
      {
        subject: 'Jg9MzrfQeYW2gBPcp',
        results: [{ studentId: 'qqNCKYEWxydhr3FAo', result: 7}],
        date: new Date(new Date() + 30)
      },
      {
        subject: 'ExQAJQ6MXpAH947bd',
        results: [{ studentId: 'ewhFrcpmzRpa4fFit', result: 10}],
        date: new Date(new Date() - 50)
      },
      {
        subject: 'grFewZCxFmb4YTxhm',
        date: new Date(new Date())
      },
    ];

    data.forEach(exam => Exams.insert(exam));
  }
});
