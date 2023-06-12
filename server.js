require('dotenv').config();
const express = require('express')
const app = express();
const PORT = 8080;
const serviceaccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY)
const admin = require('firebase-admin')
const client = require('./database')

// IMPORT ROUTES HERE
const authRouter = require('./routes/auth')
const stressLevelRouter = require('./routes/stresslevel')
const moodRouter = require('./routes/mood')

// IMPORT MIDDLEWARES HERE
const authenticateToken = require('./middlewares/authorization')


app.use(express.json())
app.use(express.urlencoded({extended: false}))

admin.initializeApp({
    credential: admin.credential.cert(serviceaccount)
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

// app.get('/db',authenticateToken, (res)  => {
//     client.query('SELECT version()'  , (err, res) => {
//         console.log(err, res)
// 
//     })

// })


// ROUTER HERE
app.use('/api/auth', authenticateToken, authRouter);
app.use('/api/stress-level', authenticateToken, stressLevelRouter);
app.use('/api/mood', authenticateToken, moodRouter);

app.post('/company/:input', async (req, res) => {
  const userInput = req.params.input;
  const sql = 'INSERT INTO company (company_name) VALUES (?)';
  await client.query(sql, [userInput]);
  res.status(200).json({ message: 'New Company Added' });
});