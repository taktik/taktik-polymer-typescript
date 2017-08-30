[![Build Status](https://travis-ci.org/hubjac1/taktik-polymer-typescript.svg?branch=master)](https://travis-ci.org/hubjac1/taktik-polymer-typescript)

# \<taktik-polymer-typeScript\>


Module providing development facilities for ozone polymer type script modules.



## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## install project dependency

run nmp and bower install.
```
$ npm install
$ bower install
```

## compile your code

```
$ node_modules/typescript/bin/tsc
```

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.


## install & configure this module in an other a typeScript project


- step 1: install dependency

> Install you dependency
> npm install --save https://github.com/taktik/taktik-polymer-typeScript


- step 2: declare package in tsconfig.json
```json
{
    "compilerOptions":{
        "path":{
            "taktik-polymer-typeScript": [
                "./node_modules/taktik-polymer-typeScript/taktik-polymer-typeScript"
            ]
        }
    }
}
```


- step 3: import where you need
```typescript
import 'taktik-polymer-typeScript/type'; // import global type declaration
import {customElement} from 'taktik-polymer-typeScript' // Import elements
```
