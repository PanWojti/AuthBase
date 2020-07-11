const express = require('express');
const router = express.Router();

router.get('/logged', (req, res) => {
  if (req.user === undefined) {
    res.redirect('/no-permission');
  } else {
    res.render('logged', {username: req.user.displayName, avatar: req.user.photos[0].value});
  }

});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', (req, res) => {
  if (req.user === undefined) {
    res.redirect('/no-permission');
  } else {
    res.render('profile');
  }
});

router.get('/profile/settings', (req, res) => {
  if (req.user === undefined) {
    res.redirect('/no-permission');
  } else {
    res.render('profileSettings');
  }
});


module.exports = router;
