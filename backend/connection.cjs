require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
let uri = `mongodb+srv://adminuser:pw123@cluster0.1tokw.mongodb.net/blogit_data?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectMongoDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    console.log("You successfully connected to MongoDB!");
  //} //finally {
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
    // Ensures that the client will close when you finish/error
    //await client.close();
  }

connectMongoDB();

module.exports = {client};