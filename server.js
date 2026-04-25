require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON requests from your admin dashboard
app.use(express.json());

// Serve your static frontend files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Create a database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// API ROUTE 1: Get all products (Used by store.html)
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// API ROUTE 2: Add a new product (Used by admin.html)
app.post('/api/products', async (req, res) => {
    const { name, description, price, stock, image_url } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, stock_quantity, image_url) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, stock, image_url]
        );
        res.status(201).json({ message: "Product added successfully", id: result.insertId });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
});

app.listen(PORT, () => {
    console.log(`🐟 Bhimavaram API Server running on port ${PORT}`);
});