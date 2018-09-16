import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/login/login.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  triggersEnter: [(context, redirect) => {
    if (Meteor.userId) {
      redirect('App.login');
    }
  }],
  action() {
    this.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('*', {
  name: 'App.notFound',
  action() {
    this.render('App_body', { main: 'App_notFound' });
  },
});

FlowRouter.route('/login', {
  name: 'App.login',
  action() {
    this.render('App_login')
  }
})
