var proxyquire = require('proxyquire'),
    test       = require('tape'),
    sinon      = require('sinon')

var exec = sinon.stub().callsArgWith(2, null, '', '')
var child_process = { exec }
var produce = proxyquire('..', { child_process })

test('accepts no options', (t) => {
    t.plan(1)
    exec.reset()
    produce(() => {
        t.pass('function called')
    })
})

test('accepts no args', (t) => {
    t.plan(1)
    exec.reset()
    t.doesNotThrow(produce)
})

test('accepts create command', (t) => {
    t.plan(1)
    exec.reset()
    produce({ create: true }, () => {
        t.ok(exec.calledWith('produce create'), 'produce called with create')
    })
})

test('accepts option to turn off devCenter creation', (t) => {
    t.plan(1)
    exec.reset()
    produce({ skipDevCenter: true }, () => {
        t.ok(exec.calledWith('produce -d'), 'produce called with -d')
    })
})

test('accepts option to turn off itunes connect creation', (t) => {
    t.plan(1)
    exec.reset()
    produce({ skipItc: true }, () => {
        t.ok(exec.calledWith('produce -i'), 'produce called with -i')
    })
})

test('accepts an identifier option', (t) => {
    t.plan(1)
    exec.reset()
    produce({ identifier: 'test.test.123' }, () => {
        t.ok(exec.calledWith('produce -a test.test.123'), 'produce called with -a')
    })
})

test('accepts a user option', (t) => {
    t.plan(1)
    exec.reset()
    produce({ user: 'gege' }, () => {
        t.ok(exec.calledWith('produce -u gege'), 'produce called with -u')
    })
})

test('accepts an teamName option', (t) => {
    t.plan(1)
    exec.reset()
    produce({ teamName: 'teama' }, () => {
        t.ok(exec.calledWith('produce -l teama'), 'produce called with -l')
    })
})

test('accepts an teamId option', (t) => {
    t.plan(1)
    exec.reset()
    produce({ teamId: 'teama' }, () => {
        t.ok(exec.calledWith('produce -b teama'), 'produce called with -b')
    })
})

test('accepts an company option', (t) => {
    t.plan(1)
    exec.reset()
    produce({ company: 'pincin' }, () => {
        t.ok(exec.calledWith('produce -c pincin'), 'produce called with -c')
    })
})

test('accepts an language option', (t) => {
    t.plan(1)
    exec.reset()
    produce({ language: 'english' }, () => {
        t.ok(exec.calledWith('produce -m english'), 'produce called with -m')
    })
})

test('accepts an sku option', (t) => {
    t.plan(1)
    exec.reset()
    produce({ sku: '131' }, () => {
        t.ok(exec.calledWith('produce -y 131'), 'produce called with -y')
    })
})

test('accepts an version option', (t) => {
    t.plan(1)
    exec.reset()
    produce({ version: '1.1' }, () => {
        t.ok(exec.calledWith('produce -z 1.1'), 'produce called with -z')
    })
})

test('accepts an app name', (t) => {
    t.plan(1)
    exec.reset()
    produce({ name: 'test' }, () => {
        t.ok(exec.calledWith('produce -q test'), 'produce called with -q')
    })
})

test('accepts a suffix option', (t) => {
    t.plan(1)
    exec.reset()
    produce({ suffix: 'gege' }, () => {
        t.ok(exec.calledWith('produce -e gege'), 'produce called with -e')
    })
})

test('accepts a createAppGroup command', (t) => {
    t.plan(2)
    exec.reset()
    produce({ createAppGroup: {name: 'winners', description: 'app group'} }, () => {
        t.ok(exec.calledWith("produce group -g winners -n 'app group'"), 'produce called with group -g name description')
    })
    exec.reset()
    produce({ createAppGroup: {name: 'winners'} }, () => {
        t.ok(exec.calledWith('produce group -g winners'), 'produce called with group -g name')
    })
})

test('accepts a associateGroup command with app and group', (t) => {
    t.plan(1)
    exec.reset()
    produce({ associateGroup: {app: 'app', group: 'app group'} }, () => {
        t.ok(exec.calledWith("produce associate_group -a app 'app group'"), 'produce called with associate_group -a app group')
    })
})

test('accepts a runtime option of timeout', (t) => {
    t.plan(1)
    exec.reset()
    produce({ timeout: 1 }, () => {
        t.ok(exec.calledWithMatch('produce', { timeout: 1 }), 'produce called with timeout runtime option')
    })
})

test('accepts a runtime option of password', (t) => {
    t.plan(1)
    exec.reset()
    produce({ password: 'password' }, () => {
        t.ok(exec.calledWithMatch('produce', { env: { FASTLANE_PASSWORD: 'password' } }), 'produce called with password runtime option')
    })
})

test('accepts a runtime option of path', (t) => {
    t.plan(1)
    exec.reset()
    produce({ path: '/something' }, () => {
        t.ok(exec.calledWithMatch('produce', { cwd: '/something' }), 'produce called with runtime path')
    })
})

test('accepts enable services with accepted options and formats', (t) => {
    t.plan(2)
    exec.reset()
    produce({ enableServices: ['app-group', { service: 'associated-domains', value: true }, 'icloud', 'foo', 'data-protection']}, () => {
        t.ok(exec.calledWith('produce enable_services --app-group --associated-domains --icloud cloudkit --data-protection complete'),
        'produce called with enable services with default setting for icloud and data protection, and checking for invalid entry')
    })

    exec.reset()
    produce({ enableServices: [{service: 'foo'}, {}, { service: 'data-protection', value: 'unlessopen' }]}, () => {
        t.ok(exec.calledWith('produce enable_services --data-protection unlessopen'),
        'produce called with enable services with data protection as object, also incorrect object service name, and empty object')
    })
})

test('accepts disable services with accepted services and formats', (t) => {
    t.plan(1)
    exec.reset()
    produce({ disableServices: ['app-group', { service: 'associated-domains', value: false }, { service: 'data-protection', value: true }, 'foo', { service: 'passbook' }, {service: 'foo'}]}, () => {
        t.ok(exec.calledWith('produce disable_services --app-group --data-protection --passbook'),
        'produce called with disable services with default setting')
    })
})
