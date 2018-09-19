import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { Transactions } from '../transactions.js';

Meteor.publish('transactions', function profilePublish() {
    if (!this.userId) {
        return this.ready();
    }
    if (Roles.userIsInRole(this.userId, ['admin'])) {
        return Transactions.find({}, {
            fields: {
                amount: 1,
                createdAt: 1
            },
        });
    } else {
        console.log(this.userId);
        return Transactions.find({
            student: this.userId
        }, {
            fields: {
                amount: 1,
                createdAt: 1
            },
        });
    }
});
