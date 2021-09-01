// Copyright (c) 2021 mms
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { ScEncode, md5 } = require('../dist/utils')

const { expect } = require('chai')

describe('Utils.ScEncode check', function () {
  it('should return code 0', async function () {
    const aes128cbc = ScEncode('abc', 'cba', '123321')

    expect(aes128cbc).be.equal('0RT5/7nts5sl3gab1WOaug==')
  })
})

describe('Utils.md5 check', function () {
  it('should equal', async function () {
    const md5a = md5('abc')
    const md5b = md5('1ac*()@!dfart')

    expect(md5a).be.equal('900150983cd24fb0d6963f7d28e17f72')
    expect(md5b).be.equal('60a56df92f747efbdb028bae4ba1eaf0')
  })
})