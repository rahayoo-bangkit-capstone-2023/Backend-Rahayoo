const express = require('express')
const app = express();
const PORT = 3000;
const serviceaccount = require('./serviceaccountkey.json')
const admin = require('firebase-admin')
const connection = require('./database')


// IMPORT ROUTES HERE
const authRouter = require('./routes/auth')
const stressLevelRouter = require('./routes/stresslevel')

// IMPORT MIDDLEWARES HERE
const authenticateJWT = require('./middlewares/authorization')


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

// ROUTER HERE
app.use('/api/auth', authenticateJWT, authRouter);


app.post('/company/:input', async (req, res)=> {
    const userInput = req.params.input;
    const sql = 'INSERT INTO company (company_name) VALUES (?)';
    await connection.query(sql, [userInput]);
    res.status(200).json({message: 'New Company Added'});
})


app.use('/api/stress', stressLevelRouter);

app.post('/company/:input', async (req, res) => {
  const userInput = req.params.input;
  const sql = 'INSERT INTO company (company_name) VALUES (?)';
  await connection.query(sql, [userInput]);
  res.status(200).json({ message: 'New Company Added' });
});