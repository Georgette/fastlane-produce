var exec = require('child_process').exec

module.exports = produce

function produce (options, cb) {

    if (typeof options === 'function') {
        cb = options
        options = {}
    }
    options = options || {}
    cb = cb || function () {}
    options.timeout = options.timeout !== undefined ? options.timeout : 0

    var cmd = 'produce'
    if (options.create)         cmd += ' create'
    if (options.skipItc)        cmd += ' -i'
    if (options.skipDevCenter)  cmd += ' -d'
    if (options.user)           cmd += ` -u ${options.user}`
    if (options.identifier)     cmd += ` -a ${options.identifier}`
    if (options.suffix)         cmd += ` -e ${options.suffix}`
    if (options.name)           cmd += ` -q ${options.name}`
    if (options.version)        cmd += ` -z ${options.version}`
    if (options.sku)            cmd += ` -y ${options.sku}`
    if (options.language)       cmd += ` -m ${options.language}`
    if (options.company)        cmd += ` -c ${options.company}`
    if (options.teamId)         cmd += ` -b ${options.teamId}`
    if (options.teamName)       cmd += ` -l ${options.teamName}`


    if (options.createAppGroup && options.createAppGroup.name) {
        cmd += ` group -g ${options.createAppGroup.name}`
        if (options.createAppGroup.description) cmd += ` -n '${options.createAppGroup.description}'`
    }

    if (options.associateGroup && options.associateGroup.app && options.associateGroup.group) {
        cmd += ` associate_group -a ${options.associateGroup.app} '${options.associateGroup.group}'`
    }

    var services = [ 'app-group', 'associated-domains', 'data-protection', 'healthkit',
    'homekit', 'wireless-conf', 'icloud', 'inter-app-audio', 'passbook', 'push-notification', 'vpn-conf' ]

    if (options.enableServices) {
        var enableServices = options.enableServices.map((option) => {
            if (typeof option === 'string' && ~services.indexOf(option)) {
                return { service: option }
            }
            else if (typeof option === 'object' && option.value !== false && ~services.indexOf(option.service)) {
                return option
            }
        }).filter((option) => {
            return option !== undefined
        })

        cmd += ' enable_services'

        enableServices.forEach((option) => {
            switch (option.service) {
                case 'data-protection':
                    cmd += ` --data-protection ${option.value || 'complete'}`
                    break
                case 'icloud':
                    cmd += ` --icloud ${option.value || 'cloudkit'}`
                    break
                default:
                    cmd += ` --${option.service}`
                    break
            }
        })
    }

    if (options.disableServices) {
        cmd += ' disable_services'
        options.disableServices.forEach((option) => {
            console.log(option, typeof option, option.value !== false, ~services.indexOf(option.service))
            if (typeof option === 'string' && ~services.indexOf(option)) cmd += ` --${option}`
            else if (typeof option === 'object' && option.value !== false && ~services.indexOf(option.service)) cmd += ` --${option.service}`
        })
    }

    var runtimeOptions = { env: Object.assign({}, process.env) }

    if (options.timeout) runtimeOptions.timeout = options.timeout
    if (options.password) runtimeOptions.env.FASTLANE_PASSWORD = options.password
    if (options.path) runtimeOptions.cwd = options.path

    exec(cmd, runtimeOptions, (err, stdout, stderr) => {
        cb(err, { stdout, stderr })
    })

}
