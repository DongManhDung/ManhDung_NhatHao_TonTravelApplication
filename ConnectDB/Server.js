const express = require("express");
const mariadb = require("mariadb");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to mariaDB
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "sapassword",
  database: "flight",
});

// Test running server
app.get("/", (req, res) => {
  res.send("Node.js server is running!");
});

//   Backend xu ly chon chuyen bay
// POST a flight after press button
app.post("/addFlight", async (req, res) => {
  const { text1, text2, selectedDate, adultCount, childCount } =
    req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO flight_searches (departure, destination, start_date, adult, child) VALUES (?, ?, ?, ?, ?)",
      [text1, text2, selectedDate, adultCount, childCount]
    );
    conn.release();
    res.status(200).json({ success: true, message: "Flight added successfully!" });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ success: false, message: "Cannot add a flight!" });
  }
});

// Get all flights search history
app.get("/getAllFlights", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM flight_searches");
    conn.release();
    
    // Log dữ liệu để kiểm tra
    console.log('Flights Data:', rows);
    
    res.json(rows);  // Trả về dữ liệu dưới dạng JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to retrieve flight data" });
  }
});


//Delete
app.delete("/deleteFlight/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM flight_searches WHERE id = ?", [id]);
    conn.release();
    res.status(200).json({ success: true, message: "Flight data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete flight data" });
  }
});

// backend xy lu chuyen bay
// Get all flight data from database
app.get("/getAllFlightsByDepAndDesAndClass", async (req, res) => {
  const { text1, text2 } = req.query;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM flights WHERE CONCAT(startPlaceFullname, ' (', startPlace, ')') = ? AND CONCAT(endPlaceFullname, ' (', endPlace, ')') = ? ", [text1, text2]
    );
    conn.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to get flight data" });
  }
});




// Backend xu ly dang nhap
// POST a user after press button
app.post("/addUser", async (req, res) => {
  const { fullName, password, email } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO user (full_name, password, email) VALUES (?, ?, ?)",
      [fullName, password, email]
    );
    conn.release();
    res.status(200).json({ success: true, message: "User added successfully!" });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ success: false, message: "Cannot add a user!" });
  }
});

// const secretKey = 'sapassword';
// Get user by fullName and password for login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM user WHERE full_name = ?", [
      username,
    ]);
    conn.release();
    if (rows.length > 0) {
      const user = rows[0];
      if (password === user.password) {
        res.status(200).json({ success: true, message: "Login successfully!" });
      } else {
        res.status(401).json({ success: false, message: "Username or password not correct!" });
      }
    } else {
      res.status(401).json({ success: false, message: "Username or password not correct!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
});


// Backend xu ly quen mat khau
// POST email recover password after press button
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "tuilaton04072003@gmail.com",
    pass: "mkxc zjdd qnxg ccrk",
  },
});

let otpStore = {};

// Generate OTP 4 digits number
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

//OTP het han sau 5p
const OTP_EXPIRATION_TIME = 5 * 60 * 1000;

app.post("/recoverPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    conn.release();

    if (rows.length > 0) {
      const otp = generateOTP();

      const mailOption = {
        from: "tuilaton04072003@gmail.com",
        to: email,
        subject: "Password Recovery with OTP",
        text: `Hello! Thanks for using my service. This is your OTP for password recovery is: ${otp}`,
      };

      await transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.error("ERROR: ", error);
          res.status(500).json({ success: false, message: "Cannot send email!" });
        } else {
          otpStore[email] = {
            otp,
            expiresAt: Date.now() + OTP_EXPIRATION_TIME,
          };
          res.status(200).json({ success: true, message: "OTP sent successfully!" });
        }
      });
    } else {
      res.status(404).json({ success: false, message: "Email not found!" });
    }
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ success: false, message: "Cannot recover password!" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOtpData = otpStore[email];

  console.log("Received email:", email, "Received OTP:", otp);
  console.log("Stored OTP Data:", storedOtpData);

  if (
    storedOtpData &&
    storedOtpData.otp.toString() === otp.toString() &&
    storedOtpData.expiresAt > Date.now()
  ) {
    delete otpStore[email];
    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

//Xu ly doi mat khau moi
app.post("/changePassword", async (req, res) => {
  const { email, password } = req.body;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(
      "UPDATE user SET password = ? WHERE email = ?",
      [password, email]
    );
    conn.release();
    if (rows.affectedRows > 0) {
      res.status(200).json({success: true, message: "Password updated successfully" });
    } else {
      res.status(404).json({success: false, message: "Failed to update password" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({success: false, message: "Failed to update password" });
  }
});



// Start server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
