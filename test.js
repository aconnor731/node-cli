var chai = require('chai');
// import { expect } from "chai"
var handleInput = require('./index');
// import { handleInput } from './index';
var assert = require('assert')

var expect = chai.expect

const testCaseInput1 = {
  add: "ADD foo bar",
  addMultipleValues: "ADD foo bar baz",
  allMembers: "ALLMEMBERS",
  clear: "CLEAR",
  keys: "KEYS",
  keyExists: "KEYEXISTS foo",
  items: "ITEMS",
  memberExists: "MEMBEREXISTS foo bar",
  members: "MEMBERS foo",
  remove: "REMOVE foo bar",
  removeAll: "REMOVEALL foo"
}

describe('handleInput()', () => {
  it('ADD', () => {
    const outputHash = { 'foo': ['bar' ] }
    const addReturn = "Added"
    expect(handleInput(testCaseInput1.add, outputHash)).to.be.equal(addReturn)
  })

  it('MEMBERS foo', () => {
    const outputHash = { 'foo': [ 'bar' ]}
    const membersReturn = [ 'bar' ]
    expect(handleInput(testCaseInput1.members, outputHash)[0]).to.be.equal(membersReturn[0])
  })

  it('KEYS', () => {
    const outputHash = {}
    const keysReturn = "empty set"
    expect(handleInput(testCaseInput1.keys, outputHash)).to.be.equal(keysReturn)
  })

  it('REMOVE foo bar', () => {
    const outputHash = {}
    const removeReturn = "ERROR, member does not exist"
    expect(handleInput(testCaseInput1.remove, outputHash)).to.be.equal(removeReturn)
  })

  it('REMOVEALL foo', () => {
    const outputHash = {}
    const removeAllReturn = "ERROR, key does not exist"
    expect(handleInput(testCaseInput1.remove, outputHash)).to.be.equal(removeAllReturn)
  })

  it('CLEAR', () => {
    const outputHash = {}
    const clearReturn = "Cleared"
    expect(handleInput(testCaseInput1.clear, outputHash)).to.be.equal(clearReturn)
  })

  it('KEYEXISTS foo', () => {
    const outputHash = {}
    const keyExistsReturn = "false"
    expect(handleInput(testCaseInput1.keyExists, outputHash)).to.be.equal(keyExistsReturn)
  })

  it('MEMBEREXISTS foo bar', () => {
    const outputHash = {}
    const memberExistsReturn = "false"
    expect(handleInput(testCaseInput1.memberExists, outputHash)).to.be.equal(memberExistsReturn)
  })

  it('ALLMEMBERS', () => {
    const outputHash = {}
    const allMembersReturn = "empty set"
    expect(handleInput(testCaseInput1.allMembers, outputHash)).to.be.equal(allMembersReturn)
  })

  it('ITEMS', () => {
    const outputHash = {}
    const itemsReturn = "empty set"
    expect(assert(itemsReturn, handleInput(testCaseInput1.items, outputHash)))
  })
})