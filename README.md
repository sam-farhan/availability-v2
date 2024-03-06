# Recommended Setup

This web app was built to be ran on an AWS EC2 instance. The Node.js process should not be exposed to the internet, but rather [Nginx can be configured to act as a reverse proxy](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04).

PM2 can then be used to run the bash script `run.sh` which is included in this repository. This script will automatically pass environment variables configured in AWS Systems Manager Parameter Store to the Node process.

If you are not using Amazon Linux, then you may need to [install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

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
