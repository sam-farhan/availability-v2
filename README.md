# Welcome to app-template 👋
[![Version](https://img.shields.io/npm/v/app-template.svg)](https://www.npmjs.com/package/app-template)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> Basic Express app template.

## Install

```sh
npm install
```

## Configuration
Configure the application using environment variables.
 - Environment: ```ENV``` (default ```DEV```)
 
### Authentication
 - Enable cookies: ```USE_SESSION``` (default ```false```)

*Cookies are required if using sign on.*
 - Session secret: ```SESSION_SECRET``` (default ```S3CrEtSesSiOn```)

### Database
 - Database name: ```DATABASE_NAME``` (default ```app_db```)
 - Database host: ```DATABASE_HOST``` (default ```localhost```)
 - Database port: ```DATABASE_PORT``` (default ```5432```)
 - Database user: ```DATABASE_USER``` (default ```postgres```)
 - Database password: ```DATABASE_PASSWORD``` (default ```Test123!```)


## Usage

To run the app on your local device, use:
```sh
npm run dev
```
***
To run the app in a cloud environment, first compile it using:
```sh
npm run build
```
And then start it with:
```sh
npm run start
```
***
To run tests:
```sh
npm run test
```

## Author

👤 **Sam Farhan**

* Github: [@sam-farhan](https://github.com/sam-farhan)
* LinkedIn: [@sam-farhan](https://www.linkedin.com/in/sam-farhan/)

## Show your support

Give a ⭐️ if this project helped you!