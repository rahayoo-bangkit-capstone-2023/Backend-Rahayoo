const express = require('express');
const router = express.Router();
const connection = require('../database');


// REGISTER USER DATA TO DB
router.post('/register',  async (req, res)=> {
    const {email, name} = req.body;
    try{
        const sql = 'INSERT INTO employees (email, name, department_id) VALUES (?, ?, ?)';
        await connection.query(sql, [email, name, 1]);
        res.status(200).json({message: 'New User Added'});
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
});

// UPDATE SAVED USER
router.post('/user-update', async (req, res)=> {
    const {name, address, date_of_birth, age, job_title, department, email} = req.body;
    try{
        const findDepartment = 'SELECT * FROM department WHERE department_name = ?';
        await connection.query(findDepartment, [department], (error, results)=> {
            if(error){
                console.error(error);
                res.status(500).json({message: 'Internal Server Error'})
            }
            if (!results.length == 0){
                const department_id = results[0].department_id;
                console.log(department_id);
                const sql = 'INSERT INTO employees (name, address, date_of_birth, age, job_title, department_id, email, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
                connection.query(sql, [name, address, date_of_birth, age, job_title, department_id, email]);
                res.status(200).json({message: 'Department found, new user added'});
            } else {
                res.status(403).json({message: 'Department Not Found'});
            }
            
        });
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
});

// UPDATE USERS COMPANY
router.get('/api/employee/company',  async (req, res)=> {
    const {company_code} = req.body;
    try{
        
        const sql = 'SELECT * FROM company WHERE company_code = ?';
        const sqlInsert = 'INSERT INTO employees (company_id) VALUES (?)';
        await connection.query(sql, [company_code], (error, results)=> {
            if (error){
                console.error(error);
                res.status(500).json({message: 'Internal Server Error'})
            }
            if (!results.length == 0){
            connection.query(sqlInsert, [results[0].company_id]);
            const response = {
                company_id: results[0].company_id,
                company_name: results[0].company_name,
                company_code: results[0].company_code,
                message: "Company found, user connected"
            }
            res.status(200).json(response);
            } else {
                res.status(403).json({message: 'Company Not Found'});
            }
        })
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
});

module.exports = router;