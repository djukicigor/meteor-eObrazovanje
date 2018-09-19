import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/login/login.js';

// Set up all routes in the app
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
  action() {
    this.render('App_body', { main: 'App_notFound' });
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
  }
})
