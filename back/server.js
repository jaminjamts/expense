import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 6789;
const sql = neon(`${process.env.DATABASE_URL}`);

app.get("/", async (_, res) => {
  res.send("server is working");
});

// new user
app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingName = await sql`SELECT * FROM users WHERE name = ${name};`;
    if (existingName.length > 0) {
      return res.status(400).json({ message: "Name already exists" });
    }
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await sql`
        INSERT INTO users (name, email, password) 
        VALUES (${name}, ${email}, ${password}) RETURNING *;
      `;

    res.status(201).json({ success: "true", user: newUser[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error during create user" });
  }
});

// /////////////////////////// login
app.post("/sign-in", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user =
      await sql`SELECT id, name, password FROM users WHERE name = ${name};`;
    if (user.length === 0) {
      return res.status(400).json({ message: "name or password not match" });
    }

    if (user[0].password !== password) {
      return res.status(400).json({ message: "password not match" });
    }

    res.status(200).json({ success: "true", data: user[0].id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error during login user" });
  }
});
/////////////////////////////////////////////// category
app.get("/categorys", async (_, res) => {
  try {
    const response = await sql`SELECT * FROM category;`;
    res.send({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: "db false" });
  }
});

////////////////////////////////////////////// ADD categoty
app.post("/category", async (req, res) => {
  const { name, description, category_icon, icon_color } = req.body;

  try {
    const response =
      await sql`INSERT INTO category (name, description, category_icon, icon_color)
    VALUES(${name}, ${description}, ${category_icon}, ${icon_color} ) RETURNING *;`;
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

////////////////////////////////////////////// transaction get
app.get("/transactions", async (req, res) => {
  const { id } = req.body;
  try {
    const response = await sql`SELECT * FROM record WHERE id = ${id};`;
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log("fetch error record");
  }
});
///////////////////////////////////////////// transaction post
app.post("/transaction", async (req, res) => {
  const { user_id, name, amount, transaction_type, description, category_id } =
    req.body;
  try {
    const response =
      await sql`INSERT INTO record (user_id, name, amount, transaction_type, description, category_id)
VALUES (${user_id},${name} ,${amount},${transaction_type},${description},${category_id}) RETURNING *;`;
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.log("fetch error");
  }
});
///////////////////////////////////////////////// DELETE
app.delete("/transaction/:id", async (req, res) => {
  const id = req.params.id;
  const { user_id } = req.body;
  try {
    const response =
      await sql`DELETE FROM record WHERE id=${id} AND user_id = ${user_id};`;
    if (response) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("db error");
  }
});
//////////////////////////////////////////// query get
app.get("/transaction", async (req, res) => {
  const { user_id } = req.body;
  const type = req.query.type;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  try {
    const response =
      await sql`SELECT * FROM record WHERE user_id=${user_id} AND transaction_type=${type} OR createdat BETWEEN ${startDate} AND ${endDate};`;
    res.status(200).json({ success: true, filteredData: response });
  } catch (error) {
    console.log("error");
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
