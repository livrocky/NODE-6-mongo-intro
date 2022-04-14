const express = require('express');
const { dbClient } = require('../config');
const { findMalesDb, findFemalesDb } = require('../model/usersModel');

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
  console.log('usersRoutes.get /users/males ran');
  const malesArr = await findMalesDb();

  if (malesArr === false) {
    res.status(500).json('something went wrong');
    return;
  }

  res.json(malesArr);
});
// GET /api/user/students - atrenkam tik students
// eslint-disable-next-line no-use-before-define
usersRoutes.get('/students', studentsController);
async function studentsController(req, res) {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksmus
    const query = { isStudent: true };
    const resourse = dbClient.db(dbName).collection(collName);
    const studArr = await resourse.find(query).toArray();
    res.json(studArr);
  } catch (error) {
    console.log('studentsController === error', error);
    res.status(500).json('something went wrong');
  } finally {
    // atsijungti
    await dbClient.close();
  }
}
// GET /api/females - atrenkam tik moteris
usersRoutes.get('/females', async (req, res) => {
  console.log('usersRoutes.get /females ran');
  const femalesArr = await findFemalesDb();

  if (femalesArr === false) {
    res.status(500).json('something went wrong');
    return;
  }

  res.json(femalesArr);
});
// GET /api/user/name/James - atrenkam useri vardu James (james dynamic) PASIZIURETI KAD VEIKTU
usersRoutes.get('/user/name/:name', async (req, res) => {
  const { name } = req.params;
  res.json(`you want to get user with name ${name}`);
});
module.exports = usersRoutes;

// usersRoutes.get('/males', async (req, res) => {
//   try {
//     // prisijungsim prie mongoDb
//     await dbClient.connect();
//     console.log('open conn');
//     // atliksim veiksma (gauti duom, irasyti duom. atnaujinti)
//     const resourse = dbClient.db(dbName).collection(collName);
//     const usersArr = await resourse.find({ gender: 'male' }).toArray();
//     console.log('usersArr===', usersArr);
//     res.json(usersArr);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json('something went wrong');
//   } finally {
//     // uzdaryti prisijungima
//     await dbClient.close();
//     console.log('close conn');
//   }
//   //   res.json('GET /users route');
// });
