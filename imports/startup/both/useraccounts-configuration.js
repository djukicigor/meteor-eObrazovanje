import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'App_login',
    redirect: '/'
  });