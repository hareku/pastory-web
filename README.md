# Pastory.me Web (Nuxt.js on AWS Lambda)
Pasry.me is the diary web service. 
https://pastory.me/

API project is here: https://github.com/hareku/pastory-api

## Commands
```
# install dependencies
$ yarn install

# run dev server
$ yarn run dev

# deploy
$ docker run --rm -v "$PWD":/var/task lambci/lambda:build-nodejs8.10
$ yarn deploy
```
