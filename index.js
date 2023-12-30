import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Connection from './database/db.js';
import path from 'path'
import router from './routes/index.js'


const app = express();
dotenv.config();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(cors());

// Use the import.meta.url property to get the current file URL
const __filename = new URL(import.meta.url).pathname;
// Use path.dirname to get the directory name
const __dirname = path.dirname(__filename);

app.use('/',router)

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/..//build")));

app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
  } catch (e) {
    res.send("Oops! unexpected error");
  }
});



app.get('/', (req, res) => {
  res.send('Hello, World!');
});


const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
const dbURL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.nuhk8gt.mongodb.net/DB?retryWrites=true&w=majority`

Connection(dbURL);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
