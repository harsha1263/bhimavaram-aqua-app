require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
    try {
        // Connect to the MySQL server we just spun up
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log("Connected to MySQL! Creating tables...");

        // Write the SQL code to create the products table
        await db.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                stock_quantity INT NOT NULL,
                image_url VARCHAR(500)
            )
        `);

        console.log("✅ Products table created successfully!");
        process.exit();
        
    } catch (error) {
        console.error("❌ Database setup failed:", error);
        process.exit(1);
    }
}

setupDatabase();
