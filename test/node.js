/**
 * Created by Estevao on 23-07-2015.
 */
(function () {
  'use strict'

  require('chai').should()
  var showdown = require('showdown'),
    showdownContainer = require('../src/showdown-container.js'),
    fs = require('fs'),
    cases = fs.readdirSync('test/cases/')
          .filter(filter())
          .map(map('test/cases/')),
    issues = fs.readdirSync('test/issues/')
          .filter(filter())
          .map(map('test/issues/'))
      // options = fs.readdirSync('test/options/')
      //   .filter(filter())
      //   .map(map('test/options/'));

  /////////////////////////////////////////////////////////////////////////////
  // Test cases
  //
  describe('Showdown Container Extension cases testcase', function () {
    var converter = new showdown.Converter({extensions: [showdownContainer]})
    for (var i = 0; i < cases.length; ++i) {
      it(cases[i].name, assertion(cases[i], converter))
    }
  })

  describe('Showdown Container Extension issues testcases', function () {
    var converter = new showdown.Converter({extensions: [showdownContainer]})
    for (var i = 0; i < issues.length; ++i) {
      it(issues[i].name, assertion(issues[i], converter))
    }
  })

  /////////////////////////////////////////////////////////////////////////////
  // Test cases
  //
  function filter() {
    return function (file) {
      var ext = file.slice(-3)
      return (ext === '.md')
    }
  }

  function map(dir) {
    return function (file) {
      var name = file.replace('.md', ''),
        htmlPath = dir + name + '.html',
        html = fs.readFileSync(htmlPath, 'utf8'),
        mdPath = dir + name + '.md',
        md = fs.readFileSync(mdPath, 'utf8')

      return {
        name:     name.replace(/_/g, ' '),
        input:    md,
        expected: html
      }
    }
  }

  //Normalize input/output
  function normalize(testCase) {

    // Normalize line returns
    testCase.expected = testCase.expected.replace(/\r/g, '')
    testCase.actual = testCase.actual.replace(/\r/g, '')

    // Ignore all leading/trailing whitespace
    testCase.expected = testCase.expected.split(/\n(\s+?)/).map(function (x) {
      return x.trim()
    }).join('\n')
    testCase.actual = testCase.actual.split(/\n(\s+?)/).map(function (x) {
      return x.trim()
    }).join('\n')

    return testCase
  }

  function assertion(testCase, converter) {
    return function () {
      testCase.actual = converter.makeHtml(testCase.input)
      testCase = normalize(testCase)
      // Compare
      testCase.actual.should.equal(testCase.expected)
    }
  }
})()
