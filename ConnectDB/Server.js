const express = require('express');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
// app.use(cors());
app.use(bodyParser.json());

// Connect to mariaDB
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sapassword',
    database: 'flight',
});

// Test running server
app.get('/', (req, res) => {
    res.send('Node.js server is running!');
  });


//   Backend xu ly chon chuyen bay
// POST a flight after press button
app.post('/addFlight', async (req, res) => {
    const { text1, text2, selectedDate, adultCount, childCount, seatClass } = req.body;
    try{
        const conn = await pool.getConnection();
        await conn.query('INSERT INTO flight_searches (departure, destination, start_date, adult, child, class) VALUES (?, ?, ?, ?, ?, ?)', [text1, text2, selectedDate, adultCount, childCount, seatClass]);
        conn.release();
        res.status(200).send('Flight added successfully!');
    }
    catch (error){
        console.error('ERROR: ', error);
        res.status(500).send('Cannot add a flight!' );
    }
});

// Get all flights search history
app.get('/getAllFlights', async (req, res) => { 
    try { 
        const conn = await pool.getConnection(); 
        const rows = await conn.query('SELECT * FROM flight_searches'); 
        conn.release(); 
        res.json(rows); 
    } 
    catch (error) { 
        console.error(error); 
        res.status(500).send('Failed to retrieve flight data'); 
    }
});

//Delete
app.delete('/deleteFlight/:id', async (req, res) => { 
    const { id } = req.params; 
    try { 
        const conn = await pool.getConnection(); 
        await conn.query('DELETE FROM flight_searches WHERE id = ?', [id]); 
        conn.release(); 
        res.status(200).send('Flight data deleted successfully'); 
    } catch (error) { 
        console.error(error); 
        res.status(500).send('Failed to delete flight data'); 
    }
});


// Backend xu ly dang nhap
// POST a user after press button
app.post('/addUser', async (req, res) => {
    const { fullName, password, email } = req.body;
    try{
        const conn = await pool.getConnection();
        await conn.query('INSERT INTO user (full_name, password, email) VALUES (?, ?, ?)', [fullName, password, email]);
        conn.release();
        res.status(200).send('User added successfully!');
    }
    catch (error){
        console.error('ERROR: ', error);
        res.status(500).send('Cannot add a user!' );
    }
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost: ${PORT}`);
});


