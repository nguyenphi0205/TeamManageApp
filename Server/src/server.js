let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let path = require('path');
let memberRoute = require('../src/routes/member')
let projectRoute = require('../src/routes/project')
let app = express();

//cros server
app.use(cors());
app.use(bodyParser.json())

//add router
app.use(projectRoute)
app.use(memberRoute)
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl.toString()}`, req.body)
    next();
})
//default router 
app.use(express.static('public'))

//handler 404 error
app.use((req, res, next) => {
    res.status(404).send('oops! you are lost !! please turn back')
    next();
})

//handler 500 error
app.use((req, res, error) => {
    res.sendFile(path.join(__dirname, '/public/500.html'))
})

// set port for server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.info(`server start on ${PORT}`)
})

