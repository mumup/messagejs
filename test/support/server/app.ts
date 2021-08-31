// Copyright (c) 2021 666666
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express from 'express'

import barkRouter from './routers/bark'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/bark', barkRouter)

export default app