import { ReactiveVar } from 'meteor/reactive-var';
import { Transactions } from '../../../api/transactions/transactions.js';

import './transactions.html';

Template.App_transactions.onCreated(function() {
    this.transactions = new ReactiveVar(this.data.transactions);
    const transactions = Meteor.subscribe('transactions');
    this.autorun(() => {
        if (transactions.ready()) {
            this.transactions.set(Transactions.find({}).fetch());
        }
    });
});

Template.App_transactions.onRendered(function() {
    $('.selection.dropdown').dropdown();
});

Template.App_transactions.events({
    'submit #js-addTransaction': function(event, template) {
        event.preventDefault();
        const amount = Number(event.currentTarget[0].value);
        const studentId = event.currentTarget[1].value;
        const button = event.currentTarget[3];
        button.classList.add('loading')
        Meteor.call('addTransaction', { amount, studentId }, (err, data) => {
            button.classList.remove('loading')
            if (err) {
                button.innerHTML = "Error";
                button.classList.add('negative');
                throw new Meteor.Error(500, err)
            }
            button.innerHTML = "Submited";
            button.classList.add('positive');
            setTimeout(() => {
                event.currentTarget.reset();
                $('.selection.dropdown').dropdown('clear');
                button.innerHTML = "Submit";
                button.classList.remove('positive', 'negative');
            }, 3000);
        })
    }
});

Template.App_transactions.helpers({
    transactions: () => Template.instance().transactions.get()
});