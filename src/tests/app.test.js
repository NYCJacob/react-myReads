import React from 'react'
import TestUtils from 'react-addons-test-utils'
import renderer from 'react-test-renderer'
import BooksApp from '../App.js'

test('works', () => {
  expect(true).toBe(true)
})

const currentBooks = require( '../App.js')

it('Returns current books array of book objects', () => {
  expect(currentBooks()).toMatchSnapshot();
})
