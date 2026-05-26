# Streamit movie

This is a project with separate client and server applications.

## Client (React)

The client application is built using React.

### Installation

Before running the client application, make sure you have Node.js installed. Then, navigate to the `client` directory and install the dependencies:

```bash
cd client
npm install
```

## Server (Express)

The server application is built using Express.

### Installation

Before running the server application, make sure you have Node.js installed. Then, navigate to the `server` directory and install the dependencies:

```bash
cd server
npm install
```



# Environment Variables
Before running the application, create an `.env` file in the root directory with the following environment variables:



### ENV Configuration

```env
MONGODB_URL="mongodb://127.0.0.1:27017/stremitdatabase?directConnection=true"
JWT_ACCESS_SECRET=jwtSecret
JWT_REFRESH_SECRET=jwtRefresh
JWT_FORGOT_SECRET=forgotPasswordSecret
JWT_ACTIVATE_SECRET=activatedSecretKey
API_PORT=5120
SECRET_SALT=7
FRONT_URL=http://192.168.0.1
NO_REPLY_EMAIL=email@gmail.com
NO_REPLY_PASSWORD=password_gmail
AWS_ACCESS=access key
AWS_KEY=secret key
AWS_REGION=us-east-1
AWS_NAME=Backet name
AWS_S3_ACL=public-read
AWS_S3_URL=your AWS S3 URL
```

## MongoDB Setup

Before starting the project, make sure MongoDB is running.  
Without MongoDB the server application will not work.

### Docker Compose

The `docker-compose.yml` file is located inside the `server` folder.

Start MongoDB with:

```bash
cd server
docker compose up -d
```

Check running containers:

```bash
docker ps
```

### Alternative: Run MongoDB Without Docker

If you do not use Docker, you can install MongoDB locally.

#### Start MongoDB locally

After installing MongoDB, run:

```bash
mongod
```

MongoDB will start on the default port:

```text
mongodb://127.0.0.1:27017
```

##  Running the project

###  Client (React)

To start the React application in development mode:

```bash
cd client
npm start
```



###  Server (Express)

To start the server in development mode:

This command will:

clean the dist folder
run TypeScript compilation in watch mode
start the server with nodemon for auto-restart on changes

```bash
cd server
npm start
```

