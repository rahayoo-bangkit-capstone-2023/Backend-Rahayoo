const express = require('express')
const app = express();
const PORT = 8080


app.listen(PORT, (error)=> {
    if(!error)
        console.log("Server is Succsesfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error)
})

app.get('/', (req, res)  => {
    res.send('Hello World! it is on')
})

app.get('/login', (req, res)=> {

})

app.get('/register', (req, res)=> {
    
})

app.get('/loginoauth', (req, res)=> {
    
})
