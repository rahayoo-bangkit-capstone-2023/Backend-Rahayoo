const express = require('express');
const router = express.Router();
const client = require('../database');


// REGISTER USER DATA TO DB
router.post('/register',  async (req, res)=> {
    const {email, name} = req.body;
    try{
        const sql = 'INSERT INTO employees (email, name) VALUES ($1, $2) RETURNING employee_id';
        await client.query(sql, [email, name], (error,results)=> {
            if (error){
                console.error(error);
                res.status(500).json({message: 'Internal Server Error'})
            }
                if (error){
                    console.error(error);
                    res.status(500).json({message: 'Internal Server Error'})
                    console.log(results);
                }
            const response = {message: 'User Registered', user_id: results.rows[0].employee_id}
            res.status(200).json(response);
        });
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
});

// UPDATE SAVED USER
router.post('/user-update/:id', async (req, res)=> {
    const id = req.params.id;
    const {name, address, date_of_birth, age, job_title, department, email} = req.body;
    try{
        const findDepartment = 'SELECT department_id FROM department WHERE department_name = $1';
        await client.query(findDepartment, [department], (error, results)=> {
            if(error){
                console.error(error);
                res.status(500).json({message: 'Internal Server Error'})
            }
            console.log(results)
            if (!results.rows.length == 0){
                const department_id = results.rows.department_id;
                console.log(department_id);
                const sql = `INSERT INTO employees (name, address, date_of_birth, age, job_title, department_id, email, company_id) VALUES ($1, $2, $3, $4, $5, $6, $7) WHERE employee_id = '${id}'`;
                client.query(sql, [name, address, date_of_birth, age, job_title, findDepartment, email]);
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
router.get('/company',  async (req, res)=> {
    const {company_code, employee_id} = req.body;
    try{
        
        const sql = 'SELECT * FROM company WHERE company_code = $1';
        const sqlInsert = 'INSERT INTO employees (company_id) VALUES ($1) WHERE employee_id = $2';
        await client.query(sql, [company_code], (error, results)=> {
            if (error){
                console.error(error);
                res.status(500).json({message: 'Internal Server Error'})
            }
            if (!results.length == 0){
            client.query(sqlInsert, [results[0].company_id, employee_id]);
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


router.get('/employee',  async (req, res)=> {
    const {user_id} = req.body;
    try{
        const sql = 'SELECT * FROM employees WHERE employee_id = $1';
        await client.query(sql, [user_id], (error, results)=> {
            if (error){
                console.error(error);
                res.status(500).json({message: 'Internal Server Error'})
            }
        res.status(200).json(results.rows[0]);
        });
    }catch(error) {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
});


router.get('/employee/data/:id',  async (req, res)=> {
    const id = req.params.id;
    try{
        const sql = `SELECT * FROM employees WHERE employee_id = '${id}'`;
        await client.query(sql, (error, results)=> {
            if (error){
                console.error(error);
                res.status(500).json({message: 'Internal Server Error'})
            }
        res.status(200).json(results.rows[0]);
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
});


module.exports = router;