const { dbClient } = require('../config');

const dbName = 'node7';
const collName = 'users';

async function findMalesDb() {
  console.log('findMalesDb ran');
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksmus
    const query = { gender: 'male' };
    const resourse = dbClient.db(dbName).collection(collName);
    const studArr = await resourse.find(query).toArray();
    return studArr;
  } catch (error) {
    console.log('findMalesDb === error', error);
    return false;
  } finally {
    // atsijungti
    await dbClient.close();
  }
}
async function findFemalesDb() {
  console.log('findFemalesDb ran');
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksmus
    const query = { gender: 'female' };
    const resourse = dbClient.db(dbName).collection(collName);
    const studArr = await resourse.find(query).toArray();
    return studArr;
  } catch (error) {
    console.log('findFemalesDb === error', error);
    return false;
  } finally {
    // atsijungti
    await dbClient.close();
  }
}

// GET /api/user/age/gt/20 - atrenkam zmones vyresnius nei 20
// (20 dinaminis segmentas kuriam galim paduoti koki norim skaiciu)
async function findUserAge(ageParam) {
  console.log('findUserAge ran');
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksmus
    const resourse = dbClient.db(dbName).collection(collName);
    const studArr = await resourse.find({ age: { $gt: +ageParam } }).toArray();
    return studArr;
  } catch (error) {
    console.log('findUsersByAge === error', error);
    return false;
  } finally {
    // atsijungti
    await dbClient.close();
  }
}
// findUserByName('James');
// GET /api/user/name/James - atrenkam useri vardu James (james dynamic)
async function findUserByName() {
  console.log('findUserByName ran');
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksmus
    const resourse = dbClient.db(dbName).collection(collName);
    const studArr = await resourse.find().toArray();
    return studArr;
  } catch (error) {
    console.log('findUserByName === error', error);
    return false;
  } finally {
    // atsijungti
    await dbClient.close();
  }
}

// async function getArrDb(query) {}

module.exports = {
  findMalesDb,
  findFemalesDb,
  findUserAge,
  findUserByName,
};
