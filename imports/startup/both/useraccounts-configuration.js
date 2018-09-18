import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'App_login',
    redirect: '/'
});

AccountsTemplates.configure({
    onLogoutHook: () => {
      FlowRouter.go('/login');
    }
});