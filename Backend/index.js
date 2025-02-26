// Impoorting express 
const express = require('express');
const UserRouter = require('./routers/userRouter');
const RecordRouter = require('./routers/recordingRouter');

const cors = require('cors');
// Creating n express app
require('dotenv').config();

const app = express();


const port = process.env.PORT;


//middleware
app.use(cors({
    method:['POST','GET','PUT','DELETE'],
    origin:['https://screen-recording-chi.vercel.app'],
}))
app.use(express.json());
app.use('/user', UserRouter);
app.use('/record', RecordRouter);



//route or endpoint
app.get('/', (req, res) => {
    res.send('response from express')
})
app.get('/add', (req, res) => {
    res.send('response from express')
})
app.get('/getall', (req, res) => {
    res.send('response from express')
})
app.get('/delete', (req, res) => {
    res.send('response from express')
})
// middlewar
app.listen(port, () => { console.log('Server started'); })
