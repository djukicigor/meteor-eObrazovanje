import './addSubject.html';

Template.App_addSubject.onCreated(function() {
    const usersSub = Meteor.subscribe('all.users');
    this.students = new ReactiveVar([]);
    this.teachers = new ReactiveVar([]);
    this.autorun(() => {
        if (usersSub.ready()) {
            this.students.set(Meteor.users.find({ 'roles.main': 'student' }).fetch())
            this.teachers.set(Meteor.users.find({ 'roles.main': 'teacher' }).fetch())
        }
    });
});

Template.App_addSubject.onRendered(function() {
    $('.selection.dropdown').dropdown();
});

Template.App_addSubject.events({
    'submit #js-addSubject': function(event, template) {
        event.preventDefault();
        const form = event.currentTarget;
        const title = form[0].value;
        const description = form[1].value;
        const students = form[2].value.split(',');
        const lecturers = form[4].value.split(',');
        Meteor.call('addSubject', { title, description, students, lecturers }, (err, data) => {
            if (err) {
                throw new Meteor.Error(err)
            }
            $('.selection.dropdown').dropdown('clear');
            form.reset();
        });
    }
});

Template.App_addSubject.helpers({
        students: () => Template.instance().students.get(),
        teachers: () => Template.instance().teachers.get()
});