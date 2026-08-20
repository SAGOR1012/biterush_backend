const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

/* ==========================
   Middleware
========================== */

app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);

app.use(express.json());

/* ==========================
   MongoDB Connection
========================== */

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vv356rj.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/* ==========================
   MongoDB
========================== */

async function run() {
  try {
    // await client.connect();

    const database = client.db('biterush_db');

    const usersCollection = database.collection('users');
    const all_foodsCollection = database.collection('all_foods');
    const cartCollection = client.db('biterush_db').collection('carts');

    // const categoriesCollection = database.collection('categories');
    // const ordersCollection = database.collection('orders');
    // const reviewsCollection = database.collection('reviews');
    // const paymentsCollection = database.collection('payments');
    // const couponsCollection = database.collection('coupons');

    /* ==========================
       Foods
    ========================== */

    app.get('/all_foods', async (req, res) => {
      const result = await all_foodsCollection.find().toArray();
      res.send(result);
    });

    app.post('/foods', async (req, res) => {
      const food = req.body;
      const result = await foodsCollection.insertOne(food);
      res.send(result);
    });

    /* ==========================
       Cart Section
    ========================== */

    /* find all carts data */
    app.post('/carts', async (req, res) => {
      const cartItems = req.body;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    /* Post carts data to database */
    app.post('/carts', async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    /* ==========================
       Categories
    ========================== */

    app.get('/categories', async (req, res) => {
      const result = await categoriesCollection.find().toArray();
      res.send(result);
    });

    /* ==========================
       Orders
    ========================== */

    app.get('/orders', async (req, res) => {
      const result = await ordersCollection.find().toArray();
      res.send(result);
    });

    app.post('/orders', async (req, res) => {
      const order = req.body;
      const result = await ordersCollection.insertOne(order);
      res.send(result);
    });

    // /* ==========================
    //    Reviews
    // ========================== */

    app.get('/reviews', async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    app.post('/reviews', async (req, res) => {
      const review = req.body;
      const result = await reviewsCollection.insertOne(review);
      res.send(result);
    });

    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.log(error);
  }
}

run();

/* ==========================
   Root Route
========================== */

app.get('/', (req, res) => {
  res.send('🍔 Bite Rush Backend Server Running...');
});

/* ==========================
   Listen
========================== */

app.listen(port, () => {
  console.log(`🚀 Server Running on Port ${port}`);
});
