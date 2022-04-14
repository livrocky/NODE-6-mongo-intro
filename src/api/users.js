const express = require('express');
const { dbClient } = require('../config');

const usersRoutes = express.Router();
const dbName = 'node7';
const collName = 'users';
// console.log('process.env.MONGO_DB_STRING)===', process.env.MONGO_DB_STRING);

usersRoutes.get('/users', async (req, res) => {
  try {
    // prisijungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gauti duom, irasyti duom. atnaujinti)
    const resourse = dbClient.db(dbName).collection(collName);
    const usersArr = await resourse.find().toArray();
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

usersRoutes.post('/users', async (req, res) => {
  try {
    // prisijungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gauti duom, irasyti duom. atnaujinti)
    const newUser = {
      name: 'James',
      hasCar: true,
      town: 'Kaunas',
    };
    const insertResult = await dbClient.db('cao_intro').collection('users').insertOne(newUser);
    console.log('insertResult===', insertResult);
    res.json(insertResult);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('something went wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
    console.log('close conn');
  }
});

// GET /api/user/males - atrenkam tik males
usersRoutes.get('/males', async (req, res) => {
  try {
    // prisijungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gauti duom, irasyti duom. atnaujinti)
    const resourse = dbClient.db(dbName).collection(collName);
    const usersArr = await resourse.find({ gender: 'male' }).toArray();
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
// GET /api/user/students - atrenkam tik students
usersRoutes.get('/students', async (req, res) => {
  try {
    // prisijungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gauti duom, irasyti duom. atnaujinti)
    const resourse = dbClient.db(dbName).collection(collName);
    const usersArr = await resourse.find({ isStudent: true }).toArray();
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
// GET /api/user/females - atrenkam tik moteris
usersRoutes.get('/females', async (req, res) => {
  try {
    // prisijungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gauti duom, irasyti duom. atnaujinti)
    const resourse = dbClient.db(dbName).collection(collName);
    const usersArr = await resourse.find({ gender: 'female' }).toArray();
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
// GET /api/user/age/gt/20 - ei 20 (20 dinaminis segmentas kuriam galim paduoti koki norim skaiciu)

module.exports = usersRoutes;
