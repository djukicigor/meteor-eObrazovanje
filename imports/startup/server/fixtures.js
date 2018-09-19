// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../api/transactions/transactions.js';

Meteor.startup(() => {
  // if the Links collection is empty
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
});
