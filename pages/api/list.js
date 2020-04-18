const { MongoClient } = require('mongodb');
const assert = require('assert');

const client = new MongoClient(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

async function insertList(db, list) {
    const collection = db.collection('user');
    let result = await collection.insertOne({list})
    return result
}

export default async (req, res) => {
  if (req.method === 'POST') {
    client.connect(function() {

      console.log('Connected to MongoDB server =>')

      const db = client.db(process.env.DB_NAME)
      const list = req.body.list
      
      insertList(db, list)
      res.status(201).json({ success: true, data: list})
      return
    });
  }
};