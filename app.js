const express = require('express');
const app = express();
const db = require('./models');
const user = require('./routes/users');
const port  = process.env.port || 6000;




// app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use('/user', user);


db.sequelize
.sync()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`app listening on port:: ${port}`)
    })
}).catch(err => console.log(err));

