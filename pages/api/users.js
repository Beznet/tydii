const { MongoClient } = require('mongodb')
const assert = require('assert')
const bcrypt = require('bcrypt')
const v4 = require('uuid').v4
const jwt = require('jsonwebtoken')

const saltRounds = 10

const client = new MongoClient(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

function findUser(db, email, callback) {
  const collection = db.collection('user')
  collection.findOne({email}, callback)
}

function createUser(db, email, password, list, callback) {
  const collection = db.collection('user')
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    collection.insertOne(
      {
        userId: v4(),
        email,
        list,
        password: hash
      },
      function(err, userCreated) {
        assert.equal(err, null)
        callback(userCreated)
      },
    )
  })
}

export default (req, res) => {
  if (req.method === 'POST') {
    // signup
    try {
      assert.notEqual('', req.body.email, 'Email required')
      assert.notEqual('', req.body.password.trim(), 'Password required')
    } catch (bodyError) {
      return res.status(403).json({error: true, message: bodyError.message})
    }
    
    // verify email does not exist already
    client.connect(function(err) {
      assert.equal(null, err)
      console.log('Connected to MongoDB server =>')
      const db = client.db(process.env.DB_NAME)
      const email = req.body.email
      const password = req.body.password
      const list = {}

      findUser(db, email, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Error finding User'})
          return
        }
        if (!user) {
          // proceed to Create
          createUser(db, email, password, list, function(creationResult) {
            if (creationResult.ops.length === 1) {
              const user = creationResult.ops[0]
              const token = jwt.sign(
                {userId: user.userId, email: user.email, list: user.list},
                process.env.JWT_SECRET,
                {
                  expiresIn: 3000, //50 minutes
                },
              )
              res.status(200).json({token})
              return
            }
          })
        } else {
          // User exists
          res.status(403).json({error: true, message: 'Email exists'})
          return
        }
      })
    })
  } else {
    // Handle any other HTTP method
    res.status(200).json({users: ['John Doe']})
  }
}
