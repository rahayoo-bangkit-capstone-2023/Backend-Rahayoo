const express = require('express')
const app = express();
const PORT = 3000;
const mysql = require('mysql')
const serviceaccount = require('./serviceaccountkey.json')
const admin = require('firebase-admin')
const authenticateJWT = require('./middlewares/authorization')

const connection = mysql.createConnection({
    host: '34.101.125.193',
    user: 'root',
    password: 'password',
    database: 'rahayoo_app'
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

admin.initializeApp({
    credential: admin.credential.cert(serviceaccount)
});

connection.connect((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Database Connected");
    }
});
  
app.listen(PORT, (error)=> {
    if(!error)
        console.log("Server is Succsesfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error)
})

app.get('/', (req, res)  => {
    res.send('Hello World! it is on')
})

// REGISTER TO SAVE ACCOUNT TO DB
app.post('/register', async (req, res)=> {
});



app.get('/companies', authenticateJWT,  (req, res)=> {
    try{
        const sql = 'SELECT * FROM company';
        connection.query(sql, (error, results)=> {
            if(error) throw error;
            res.status(200).json(results);
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
})

app.get('/loginwithgoogle', (req, res)=> {
    
})

app.post('/company/:input', async (req, res)=> {
    const userInput = req.params.input;
    const sql = 'INSERT INTO company (company_name) VALUES (?)';
    await connection.query(sql, [userInput]);
    res.status(200).json({message: 'New Company Added'});
})
