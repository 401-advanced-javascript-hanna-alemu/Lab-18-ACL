'use strict';

const express = require('express');
const aclRouter = express.Router();

const User = require('./model/user.js');
const Article = require('./model/article.js');
const auth = require('./middleware/auth.js');
const oauth = require('./oauth/google.js');

//Hanna - this route is visible by anyone
aclRouter.get('/public-stuff', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then((user) => {
      req.token = user.generateToken(user.role);
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(next);
});

//Hanna - this routes requires signin
aclRouter.get('/hidden-stuff', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send({ user: req.user, token: req.token });
});

//Hanna - this route requires the read capability
aclRouter.get('/something-to-read', auth('read'), (req, res, next) => {

      .then(article => {
        res.status(200);
        res.send(article);
      })
      .catch(next)

});

//Hanna - this route requires the create capability
aclRouter.post('/create-a-thing', auth('create'), (req, res, next) => {
  let article = new Article(req.body);
  article.save()
    .then(article => {
      res.status(200);
      res.send(article);
    })
    .catch(next);

});

//Hanna - This route requires the update capability
aclRouter.put('/update', auth('update'), (req, res, next) => {

});

//Hanna- THis route requires update capability
aclRouter.patch('/jp', auth('update'), (req, res, next) => {

});

//Hanna - this route requires the delete capabiliy
aclRouter.delete('/bye-bye', auth('delete'), (req, res, next) => {

});

//Hanna - this route requires the superuser capability
aclRouter.get('/everything', auth('superuser'), (req, res, next) => {

});

module.exports = aclRouter;
