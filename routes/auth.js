const express = require('express');
const router = express.Router();
const client = require('../database');


// REGISTER USER DATA TO DB
router.post('/register',  async (req, res)=> {
    const {email, name, uid} = req.body;
    try{
        const sql = 'INSERT INTO employees (email, name, uid) VALUES ($1, $2, $3) RETURNING employee_id';
        await client.query(sql, [email, name, uid], (error,results)=> {
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

router.get('/userid/',  async (req, res)=> {
    const {email, uid} = req.body;
    const sqlGet = 'SELECT employee_id FROM employees WHERE email = $1 AND uid = $2';
    try{
        await client.query(sqlGet, [email, uid], (error, results)=> {
            if(error){
                console.error(error);
                res.status(500).json({message: 'Internal Server Error'})
            }
            res.status(200).json(results.rows[0].employee_id);
        })
    } catch (error){
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
})

// UPDATE SAVED USER
router.post('/user-update/:id', async (req, res) => {
    const id = req.params.id;
    const { name, address, date_of_birth, age, job_title, department, email, uid } = req.body;
  
    try {
      const findDepartment = 'SELECT department_id FROM department WHERE department_name = $1';
      const departmentResult = await client.query(findDepartment, [department]);
  
      if (departmentResult.rows.length !== 0) {
        const department_id = departmentResult.rows[0].department_id;
  
        const sql = `UPDATE employees SET name = $1, address = $2, date_of_birth = $3, age = $4, job_title = $5, department_id = $6, email = $7, uid=$9 WHERE employee_id = $8`;
        const values = [name, address, date_of_birth, age, job_title, department_id, email, id, uid];
  
        await client.query(sql, values);
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(403).json({ message: 'Department Not Found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }u
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