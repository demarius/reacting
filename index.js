var React = require('react'), jsx = require('node-jsx')
var browserify = require('browserify'), express = require('express')

jsx.install()

var index = require('./views/index.jsx')

express.use('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    res.end(React.renderToStaticMarkup(
        React.DOM.body(
            null,
            React.DOM.div({
                id: 'reacting'
            }),
            React.DOM.script({
                'id': 'data',
                'type':  'text/plain',
                'data-json': JSON.stringify({})
            }),
            React.DOM.script({
                src: '/bundle.js'
            })
        )
    ))
})

express.use('/bundle.js', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript')
    browserify('./app.js', {
        debug: true
    }).transform('reactify').bundle().pipe(res)
})
