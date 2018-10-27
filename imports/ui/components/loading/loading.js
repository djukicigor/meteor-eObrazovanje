import './loading.html';

Template.App_loading.onRendered(function() {
    $('.segment').dimmer('show');
});

Template.App_loading.onDestroyed(function() {
    $('.segment').dimmer('hide');
});