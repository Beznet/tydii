const { MongoClient } = require('mongodb');
const assert = require('assert');

const client = new MongoClient(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

function insertList(db, list) {
    const collection = db.collection('user');
    collection.insertOne({list}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        })
}

export default (req, res) => {
    if (req.method === 'POST') {
      client.connect(function() {
        console.log('Connected to MongoDB server =>');
        const db = client.db(process.env.DB_NAME);
        const list = req.body.list;
  
        insertList(db, list, function(err) {
            if (err) {
            res.status(500).json({error: true, message: 'Error creating list'});
            return;
            }
            if (!list) {
            res.status(404).json({error: true, message: 'User not found'});
            return;
            } else {
            res.status(200).json({list})
            return;
            }
        });
      });
    }
  };