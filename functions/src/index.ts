import * as functions from 'firebase-functions';
import admin = require('firebase-admin');

admin.initializeApp();

exports.usersFollowers = functions.https.onRequest((req, res) => {
    const body = req.body;
    return res.status(200).send(body);
  });