const { MongoClient } = require('mongodb')
const jwt = require('jsonwebtoken')
const assert = require('assert')

const client = new MongoClient(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

async function insertList(db, user, list) {
  const collection = db.collection('user')
  let result = await collection.updateOne({userId: user }, {$set: {list: list}})
  return result
}

export default async (req, res) => {
  if (req.method === 'POST') {
    client.connect(function() {

      console.log('Connected to MongoDB server =>')

      const db = client.db(process.env.DB_NAME)
      const user = req.body.user
      const list = req.body.list
      try {
        insertList(db, user, list)
        res.status(201).json({ success: true, data: list})
      } catch(err) {
        res.status(400).json({ error: true, message: "There was an error with this request"})
      }
      return
    })
  }
}