var express = require('express');
var router = express.Router();


var emps = [{
    id: '1',
    name: 'Sharath',
    fb: 'https://fb.com/sharath70',
    linkedin: 'https://linkedin.com/chall25',
    wife: 'unknown',
    kids: 0,
    birthday: '12/04/1993',
    personal_docs_id: '1',
    shared_docs_id: '1',
    conatactId: '1',
    vehicleId: '1',
    leaveId: '1'
},
{
    id: '2',
    name: 'Sharath2',
    fb: 'https://fb.com/sharath70',
    linkedin: 'https://linkedin.com/chall25',
    wife: 'unknown',
    kids: 0,
    birthday: '12/04/1993',
    personal_docs_id: '2',
    shared_docs_id: '2',
    conatactId: '2',
    vehicleId: '2',
    leaveId: '2'
}, {
    id: '3',
    name: 'Sharath3',
    fb: 'https://fb.com/sharath70',
    linkedin: 'https://linkedin.com/chall25',
    wife: 'unknown',
    kids: 0,
    birthday: '12/04/1993',
    personal_docs_id: '3',
    shared_docs_id: '3',
    conatactId: '3',
    vehicleId: '3',
    leaveId: '3'
}, {
    id: '4',
    name: 'Sharath4',
    fb: 'https://fb.com/sharath70',
    linkedin: 'https://linkedin.com/chall25',
    wife: 'unknown',
    kids: 0,
    birthday: '12/04/1993',
    personal_docs_id: '4',
    shared_docs_id: '4',
    conatactId: '4',
    vehicleId: '4',
    leaveId: '4'
}];

// fetch employee details
router.get('/getEmployees', function (req, res, next) {
    res.send({ employees: emps });
});

// add employee details
router.post('/addEmployee', function (req, res, next) {
    emps.push(req.body.emp);
    res.send('Added employee');
});

// update employee details
router.put('/updateEmployee/:id', function (req, res, next) {
    emps.forEach(function (emp) {
        if (req.id == emp.id) {
            emp = req.body.emp;
        }
    });

    res.send('Updated employee');
});

// delete employee
router.delete('/employee/:id', function (req, res, next) {
    emps.forEach(function (emp, index) {
        if (req.id == emp.id) {
            emps.splice(index, 1);
        }
    });

    res.send('Deleted employee');
});

module.exports = router;