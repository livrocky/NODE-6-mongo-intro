const express = require('express');
const { MongoClient } = require('mongodb');

const usersRoutes = express.Router();

const dbClient = new MongoClient(process.env.MONGO_DB_STRING);
// console.log('process.env.MONGO_DB_STRING)===', process.env.MONGO_DB_STRING);

usersRoutes.get('/users', async (req, res) => {
  try {
    // prisijungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gauti duom, irasyti duom. atnaujinti)
    const usersArr = await dbClient.db('cao_intro').collection('users').find().toArray();
    console.log('usersArr===', usersArr);
    res.json(usersArr);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('something went wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
    console.log('close conn');
  }
  //   res.json('GET /users route');
});

module.exports = usersRoutes;