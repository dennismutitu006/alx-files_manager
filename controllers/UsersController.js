import sha1 from 'sha1';
import DBClient from '../utils/db';
// import RedisClient from '../utils/redis';

const { ObjectId } = require('mongodb');

class UsersController {
  static async postNew(request, response) {
    const userEmail = request.body.email;
    if (!userEmail) {
      return response.status(400).send({ error: 'Missing email' });
    }

    const userPassword = request.body.password;
    if (!userPassword) {
      return response.status(400).send({ error: 'Missing password' });
    }

    const oldEmail = await DBClient.db.collection('users').findOne({ email: userEmail });
    if (oldEmail) return response.status(400).send({ error: 'Already exist' });

    const hashedUserPassword = sha1(userPassword);
    const endPoint = await DBClient.db.collection('users').insertOne({ email: userEmail, password: hashedUserPassword });
    return response.status(201).send({ email: userEmail, id: endPoint.insertedId });
  }
}
module.exports = UsersController;
