Factory.define('user', Meteor.users, {});
Factory.define('exam', Exams, {})
const userId = Random.id();

describe('exam tests', function() {
    it('can add result', function() {
        const teacher = Factory.create('user', {});
        Roles.addUsersToRoles(teacher._id, ['teacher'], 'main');
        const student = Factory.create('user', {});
        const exam = Factory.create('exam', {});
        examMethods.setResult._execute({ userId: teacher._id }, { examId: exam._id, studentId: student._id, result: 6 })
        assert.equal(Exams.findOne({
            _id: exam._id
        }).students[0].result, 6)
    })
})