const express = require('express')
const app = express();
console.log('middleware start')
const authMiddleware = (req, res, next) => {
    console.log("middel : "+req.session.user);
    if (!req.session.user) {
      return res.redirect("/");
    }
    next();
  };
  module.exports = authMiddleware;