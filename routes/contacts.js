var express = require('express');
var router = express.Router();


var contacts = [{
    id: '1',
    emergency: {
        name: 'Bharath',
        phone: '9705343929348'
    },
    background_check: {
        name: 'XXX',
        phone: '487524857239'
    },
    empId: '1'
    },
    
    {
    id: '2',
    emergency: {
        name: 'Bhafarath',
        phone: '9743929348'
    },
    background_check: {
        name: 'XXTTTX',
        phone: '392545494'
    },
    empId: '2'
    }
];

// fetch contact details
router.get('/getEmployeeContacts', function (req, res, next) {
    res.send({contacts: contacts});
});

// add employee contact details
router.post('/addEmployeeContact', function (req, res, next) {
    contacts.push(req.body.contact);
    res.send('Added employee contacts details');
});

// update employee details
router.put('/updateEmployeeContact/:id', function (req, res, next) {
    if (contacts.length > 0) {
        contacts.forEach(function (emp) {
            if (req.id == emp.id) {
                emp = req.body.contact;
            }
        });
        res.send('Updated employee contact');
    }
});

// delete employee
router.delete('/employee/:id', function (req, res, next) {
    if (contacts.length > 0) {
        contacts.forEach(function (emp, index) {
            if (req.id == emp.id) {
                contacts.splice(index, 1);
            }
        });

        res.send('Deleted employee');
        
    }
});

module.exports = router;