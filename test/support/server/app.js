// Copyright (c) 2021 666666
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const express = require('express')

const barkRouter = require('./routers/bark')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/bark', barkRouter.router)

module.exports.app = app