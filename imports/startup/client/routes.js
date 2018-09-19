import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import { Transactions } from '../../api/transactions/transactions.js';

// Import needed templates
import '../../ui/layouts/body/body.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, qs, user) {
    this.render('App_body', 'App_home', { user });
  },
  waitOn() {
    return [import('../../ui/pages/home/home.js'), Meteor.subscribe('user.info')];
  },
  data() {
    return Meteor.users.findOne({ _id: Meteor.userId() })
  }
});

FlowRouter.route('/', {
  name: 'App.home',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, qs, user) {
    this.render('App_body', 'App_home', { user });
  },
  waitOn() {
    return Meteor.subscribe('user.info');
  },
  data() {
    return Meteor.users.findOne({ _id: Meteor.userId() })
  }
});

FlowRouter.route('*', {
  name: 'App.notFound',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    this.render('App_body', { main: 'App_notFound' });
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
    return [import('../../ui/pages/transactions/transactions.js'), Meteor.subscribe('transactions')];
  },
  data() {
    return Transactions.find({}).fetch();
  }
});