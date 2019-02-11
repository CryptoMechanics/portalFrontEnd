# Worbli V2 Front End

## Install Dependancies
* [Node & NPM](https://nodejs.org/en/download/)
```html
npm install polymer-cli -g --unsafe-perm
npm install pm2 -g
```
## Edit env.js 
Set api apiUrl 

## Installation Server
Set port and host in package.json
```html
npm install
polymer build
pm2 start ecosystem.config.js
pm2 save
```

## Run Localy
```html
npm install
polymer serve
```
open the url shown in the cli

## Docker Installation 
```html
npm install
npm run docker
```
open [localhost:9010](http://localhost:9010)

## To view the Identity application form 
[http://127.0.0.1:9010/settings/identity/](http://127.0.0.1:9010/settings/identity/)