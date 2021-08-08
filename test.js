var chai = require('chai');
// import { expect } from "chai"
var handleInput = require('./index');
// import { handleInput } from './index';
var assert = require('assert')

var expect = chai.expect

const testCaseInput1 = {
  add: "ADD foo bar"
}

describe('handleInput()', () => {
  it('should ADD key with value', () => {
    const outputHash = { 'foo': ['bar' ] }
    const outputOfHandleInput = handleInput(testCaseInput1.add)
    // expect(handleInput(testCaseInput1.add)).to.be.deepEqual(outputHash)
    expect(assert(outputHash, handleInput(testCaseInput1.add)))
  })
})