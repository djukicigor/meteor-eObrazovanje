// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../api/transactions/transactions.js';
import { Subjects } from '../../api/subjects/subjects.js';
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
});
