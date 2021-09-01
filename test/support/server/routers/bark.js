// Copyright (c) 2021 666666
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const express = require('express')
// import createError from 'http-errors'
const router = express.Router()

/* GET home page. */
router.post('/:deviceKey/push', function (req, res) {
  return res.status(200).json({ code: 200, message: 'success' })
})

module.exports.router = router
