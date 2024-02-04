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



### MongoDB Configuration

```env
 MONGODB_URL="mongodb+srv://nedelevich:Oventiger1986@stremitdatabase.q8s4f2c.mongodb.net/"
JWT_ACCESS_SECRET=jwtSecret
JWT_REFRESH_SECRET=jwtRefresh
JWT_FORGOT_SECRET=forgotPasswordSecret
JWT_ACTIVATE_SECRET=activatedSecretKey
API_PORT=5120
SECRET_SALT=7
FRONT_URL=http://192.168.0.1
NO_REPLY_EMAIL=nedelevich@gmail.com
NO_REPLY_PASSWORD=jxogfsrtsexamjkv
AWS_ACCESS=access key
AWS_KEY=secret key
AWS_REGION=us-east-1
AWS_NAME=Backet name
AWS_S3_ACL=public-read
AWS_S3_URL=your AWS S3 URL
```

## Authorization data

Authorization data for the user:

```json
[
  {
    "username": "user1@gmail.com",
    "password": "user_2023"
  },
  {
    "username": "user2@gmail.com",
    "password": "user_2023"
  },
  {
    "username": "user3@gmail.com",
    "password": "user_2023"
  }
]
