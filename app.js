const mysql = require('mysql')
const express = require('express')
const port = 3000
app = express();

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    connectionLimit: 10,
    database:"employeeDB"
})

pool.query("SELECT * FROM employees", (err,data) => {
    if(err){
        console.log(err)
        console.error("Something went wrong.");
    }
    else{
        console.log("Successfully connected to database")
        for(i = 0; i < data.length; i++){
            console.log(data[i].Name)
        }
    }
})


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', './views');

app.get('/', function(req,res){
    res.render('index')
})

app.post('/', (req, res) => {
    // Handle POST request (e.g., process form data)
    const formData = req.body;
    const {name, salary, status} = formData
    console.log('Received form data:', formData);
    const syntax = 'INSERT INTO employees (name, salary, status) VALUES (?, ?, ?)';
    const values = [name, salary, status];
    pool.query(syntax, values, (err,result) => {
        if(err){
            console.error(`Failed to insert data: ${err}`)
        }
        else{
            console.log(`Successfully inserted data.`)
        }
    })
    pool.query("SELECT * FROM employees", (err,data) =>{
        if(err){
            console.error(`Unable to access database: ${err}`);
        }
        else{
            console.log(data)
        }
    })
    
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })

