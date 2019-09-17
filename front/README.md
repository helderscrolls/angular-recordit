# RecordIt
RecordIt is a software to record and manage videos

## Requirements

*  This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.
*  You need to download [NW.js](https://nwjs.io/) to see the project and take the version 0.36.4 NORMAL. 
*  We work on the version `"rxjs": "^6.0.0"`
* Install globally nw-gyp with `sudo npm i -g nw-gyp`, we use it to build some npm packages for nwjs

## Install

1. first you need to clone the project
2. you have to go on the develop branch
3. do an `npm install` into the root folder
4. Run `sudo ./scripts/build-robotjs.sh` to build robotJs for nwjs
5. Run `npm run build` to lunch RecordIt

We don't use 'ng serve' but if NWjs is slow you can run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Frequently, you need to refresh the app to see your modifications even if NWjs refresh your page when you saved.
