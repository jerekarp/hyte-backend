// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import {getUserById, getUsers, postUser, postLogin, putUser} from './controllers/user-controller.mjs';
import entryRouter from './routes/entry-router.mjs';
import itemRouter from './routes/item-router.mjs';
import userRouter from './routes/user-router.mjs';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.json());
// Staattinen sivusto palvelimen juureen (public-kansion sisältö näkyy osoitteessa http://127.0.0.1:3000/sivu.html)
app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Staattinen sivusto "ali-url-osoitteessa": http://127.0.0.1:3000/sivusto
// Tarjoiltava kansio määritellään relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

app.use('/entries', entryRouter);
// RESOURCE /item endpoints
app.use('/items', itemRouter);

// Users resource
app.use('/users', userRouter);
// list users
app.get('/users', getUsers);
// get info of a user
app.get('/users/:id', getUserById);
// user registration
app.post('/users', postUser);
// user login
app.post('/users/login', postLogin);
// update user
app.put('/users/:id', putUser);

// GET http://127.0.0.1:3000
// ei toimi tällä hetkellä, koska public-server tarjoilee index.html:n ensin
app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
