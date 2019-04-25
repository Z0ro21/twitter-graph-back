import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
import Twitter = require('twitter');

admin.initializeApp();

const client = new Twitter({
  consumer_key: 'EKg4ZdnUuuWYqtoxzoqFVmZhw',
  consumer_secret: 'vv4VK521OxkiB0kAuu0XG6sTUQdJVQ6gN8LUrWnTe105cruEvs',
  access_token_key: '1722360440-Ze3cg265D1sGxwWPzqjVC0fApBBH8KDDIn98gjQ',
  access_token_secret: 'r0wsY8OJc6U2iInv0mhHR1kq7ihdHLsLrfZr3VhkCO956'
});

exports.usersFollowers = functions.https.onRequest(async (req, res) => {
  const body = req.body;
  const followers: any = await Promise.all(
    body.users.map(async (user: { screen_name: string; }) => {
      const params = {
        screen_name: user.screen_name
      };
      const myFollowers = await client.get('followers/list.json', params);
      const following = await client.get('friends/list.json', params);
      const followersUsers = myFollowers.users.map( (mu: { screen_name: any; }) => { return mu.screen_name})
      const friendsUsers = following.users.map( (fu: { screen_name: any; }) => { return fu.screen_name})
      return intersect(followersUsers, friendsUsers);
    }));
  return res.status(200).send(intersect(followers[0], followers[1]));
});

function intersect(a: any[], b: any[]) {
  const result = a.filter( x => { return b.indexOf(x) > -1; })
  return result;
}





