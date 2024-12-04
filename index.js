require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const connectToDb = require('./database/connectToDb');
connectToDb()
const authRoutes = require('./routes/auth-routes');
const adminRoutes = require('./routes/admin-routes');
const homeRoutes = require('./routes/home-routes');


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/home', homeRoutes)



app.listen(PORT, ()=>console.log(`server is listening on port: ${PORT}`));