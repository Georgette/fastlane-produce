var proxyquire = require('proxyquire'),
    test       = require('tape'),
    sinon      = require('sinon')

var error = new Error('boom')
var exec = sinon.stub().callsArgWith(2, error, '', '')
var child_process = { exec }
var produce = proxyquire('..', { child_process })

test('produce wrapper callback receives exec errors', (t) => {
    t.plan(1)
    exec.reset()
    produce({}, (err) => {
        t.equal(err, error, 'got error')
    })
})
