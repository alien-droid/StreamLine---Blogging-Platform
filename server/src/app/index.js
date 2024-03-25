import "dotenv/config.js";
import express from 'express'
import cors from 'cors'
import { loginUser, registerUser, verifyJWT } from '../actions/index.js'
import Router from '../router/index.js'
import { connectToDB } from "../db/index.js";
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('..',import.meta.url))
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/src/uploads', express.static(__dirname+'/uploads'))


app.post('/register', (req, res) => {
    registerUser(req, res)
})

app.post('/login', (req, res) => {
    loginUser(req, res)
})

app.get('/example', verifyJWT, (req, res) => {
    const userData = req.user
    console.log(userData)
    res.json({ message: "Access granted" })
})

app.use(Router)

const port = process.env.PORT || 4000 // Port we will listen on

// Function to listen on the port
connectToDB().then(() => {
    app.listen(port, () => console.log(`This app is listening on port ${port}`));
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); 
});

