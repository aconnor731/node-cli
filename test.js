var chai = require('chai');
// import { expect } from "chai"
var handleInput = require('./index');
// import { handleInput } from './index';
var assert = require('assert')

var expect = chai.expect

const testCaseInput1 = {
  add: "ADD foo bar",
  addMultipleValues: "ADD foo bar baz",
  clear: "CLEAR",
  keys: "KEYS",
  members: "MEMBERS foo",
  removeAll: "REMOVEALL foo"
}

describe('handleInput()', () => {
  it('KEYS', () => {
    const outputHash = { 'foo': ['bar' ] }
    expect(assert(outputHash, handleInput(testCaseInput1.add, outputHash)))
  })

  it('should ADD key with multiple values', () => {
    const outputHash = { 'foo': ['bar', 'baz' ] }
    expect(assert(outputHash, handleInput(testCaseInput1.addMultipleValues, outputHash)))
  })

  it('should return MEMBERS of foo key', () => {
    const outputHash = { 'foo': ['ice', 'dog'] }
    expect(assert(outputHash, handleInput(testCaseInput1.members, outputHash)))
  })

  it('should return KEYS of in-memory dictionary', () => {
    const outputHash = { 'foo': ['run', 'dmc'] }
    expect(assert(outputHash, handleInput(testCaseInput1.keys, outputHash)))
  })

  it('should CLEAR the in-memory dictionary', () => {
    const outputHash = { 'foo': ['idk', 'dos'] }
    expect(assert(outputHash, handleInput(testCaseInput1.clear, outputHash)))
  })

  // it('should REMOVEALL values of and the key of foo', () => {
  //   const outputHash = { 'foo': ['doo', 'bop'] }
  //   expect(assert(outputHash, handleInput(testCaseInput1.removeAll, outputHash)))
  // })
})