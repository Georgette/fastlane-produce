var test    = require('tape'),
    subject = require('..')

test('init', function (t) {
    var thing = subject()
    t.ok(thing, 'module can be required')
    t.end()
})
