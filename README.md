# fastlane-produce

[![NPM version](https://badge.fury.io/js/fastlane-produce.png)](http://badge.fury.io/js/fastlane-produce)
[![Build Status](https://travis-ci.org/Georgette/fastlane-produce.svg?branch=master)](https://travis-ci.org/Georgette/fastlane-produce)
[![Coverage Status](https://coveralls.io/repos/Georgette/fastlane-produce/badge.png?branch=master)](https://coveralls.io/r/Georgette/fastlane-produce?branch=master)

### Node.js Wrapper for the [Ruby Fastlane Produce Tool](https://github.com/fastlane/produce)

### Important
You will have to follow the fastlane API when determining what options you need to have passed for whatever command you are trying to use. For example, if I want to create an app, I'd need to pass the required options of username, app identifier, app name, and company name. This may change in the future, however.

### I recommend manually testing the fastlane commands on the command line to see what fastlane expects.

## example

```javascript
var produce = require('fastlane-produce')
var options = {
    create:true,
    username:'gege',
    app:'yoyo',
    identifier:'123',
    skipItc: true,
    enableServices: [{service:'icloud', value:'legacy'}, 'homekit']
}
produce(options, function(err) {
    if (err) console.log(err)
    else //do something
})
```

## api

```
var produce = require('fastlane-produce')
```
## produce(options, [callback])

Accepts a required options object, with the available options listed below. Optional callback function.

### Produce Options


|Produce Option |Example|Description|Command Executed|
|-------------|-------|-----------|----------------|
| create (boolean)     | { create:true } | Creates a new app on iTunes Connect and the Apple Developer Portal | create |
| skipItc (boolean)    | { skipItc: true } | Skip the creation of the app on iTunes Connect | -i |
| skipDevCenter (boolean)    | { skipDevCenter: true } | Skip the creation of the app on Apple Developer Portal | -d |
| name (string)        |   { name: 'appname' } | App Name | -q {name} |
| identifier (string)  | { identifier:'myapp' } | The bundle identifier of your app | -a { identifier } |
| user (string)       |  { user:username } | Your Apple ID Username | -u { user } |
| teamId (string) | { teamId:'ekjo' } |   The ID of your team if you're in multiple teams | -b { teamId } |  
| teamName (string) | { teamName:'teamA' }   | The name of your team if you're in multiple teams | -l { teamName } |
| suffix (string) | { suffix:'pin' } | App Identifier Suffix (Ignored if App Identifier does not ends with .*) | -e { suffix } |
| version (string) | { version:'1.0' } | Initial version number | -z { version } |
| sku (string)    | { sku:'23423' } | SKU Number |  -y { sku } |
| language (string)   | { language:'french' } | Primary Language (e.g. 'English', 'German') |  -m { language } |
| company (string)    | { company:'ABC' } | The name of your company. Only required if it's the first app you create |  -m { language } |
| createAppGroup (object) | { createAppGroup :{name:'app group name', description: 'app group description' }} | Create a New App Group | group -g { name } -n { description } |
| associateGroup (object) | { associateGroup: { app:'app identifier', group:'group id'} } |Associate with a group, which is create if needed or simply located otherwise | associate_group -a { app } { group } |



### Enabling and Disabling Services

Note: Both enableServices and disableServices can be an array of strings, array of objects (with required key of service, optional key of value), or mixed.

|Option | Example | Description | Command Executed |
|-----|-----|-----|
|enableServices (array of strings or object with required service key) | { enableServices:['app-group', { service:'icloud', value:'legacy'}] }| Enable specific Application Services for a specific app on the Apple Developer Portal| enable_services --app-group --icloud 'legacy'|

### Services that can be enabled

```


    app-group          Enable App Groups
    associated-domains Enable Associated Domains
    healthkit          Enable HealthKit
    homekit            Enable HomeKit
    wireless-conf      Enable Wireless Accessory Configuration
    inter-app-audio    Enable Inter-App-Audio
    passbook           Enable Passbook
    push-notification  Enable Push notification (only enables the service, does not configure certificates)
    vpn-conf           Enable VPN Configuration
    icloud STRING      Enable iCloud, DEFAULTS TO CLOUDKIT but acceptable values are "legacy" or "cloudkit"
    data-protection    Enable Data Protection, DEFAULTS TO "complete" but acceptable values are "complete", "unlessopen" and "untilfirstauth"

    if icloud or data-protection is passed as string, it will set defaults. To override default properties,
    pass an object with service and value. { service:'icloud', value: 'legacy'}


```

|Option | Example | Description | Command Executed |
|-----|-----|-----|
|disableServices (array of strings or object with required service key) | { disableServices:['app-group', { service:'icloud'}, 'data-protection'] }| Disable specific Application Services for a specific app on the Apple Developer Portal| disable_services --app-group --icloud --data-protection|

### Services that can be disabled

```
    app-group          Disable App Groups
    associated-domains Disable Associated Domains
    data-protection    Disable Data Protection
    healthkit          Disable HealthKit
    homekit            Disable HomeKit
    wireless-conf      Disable Wireless Accessory Configuration
    icloud             Disable iCloud
    inter-app-audio    Disable Inter-App-Audio
    passbook           Disable Passbook
    push-notification  Disable Push notifications
    vpn-conf           Disable VPN Configuration
```


### Runtime Options

|Runtime Option |Example|Description|
|----------------|-------|-----------|
|timeout (number)| { timeout:0 } | specify when to exit execution in case of error |
|password (string)| {password:''} | app store password |
|path (string)| {path:'/'} | path of directory where produce executes|

## install

With [npm](https://npmjs.org) do:

```
npm install --save fastlane-produce
```

## testing

`npm test`

### coverage

`npm run view-cover`

This will output a textual coverage report.

`npm run open-cover`

This will open an HTML coverage report in the default browser.
