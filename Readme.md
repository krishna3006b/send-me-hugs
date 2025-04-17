# Send Me Hugs - Crowdfunding Blockchain Project

This is a crowdfunding blockchain project featuring fundraisers, a CMS system, MetaMask payment support, and additional functionalities.

Server is deployed on render so kindly wait atleast a minute for server to get deployed

Your machine must have Typescript & Nodemon & other packages installed globally for this to run since this project is not containerised yet.

## Features

- Fundraiser support for users
- CMS system for managing content
- MetaMask payment integration for secure transactions
- Stores data in MongoDB using Mongoose
- JWT-based authentication system
- Cloudinary integration for file uploads

## Prerequisites

Before running the project, ensure that you have the following:

- Node.js installed (version 18.X.X or higher)
- MongoDB instance (Atlas or local)
- MetaMask installed for blockchain transactions
- Cloudinary account for file storage
- Ethereum wallet address for contract interactions

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/krishna3006b/send-me-hugs.git
```

### 2. Navigate to Project Directory

```bash
cd send-me-hugs
```

### 3. Client Setup

Navigate to the `client` folder and install dependencies:

```bash
cd client
npm install
```

### 4. Server Setup

Navigate to the `server` folder and install dependencies:

```bash
cd ../server
npm install
```

### 5. Environment Variables

Create a `.env` file in both `client` and `server` directories with the following environment variables:

#### Client `.env`:
```plaintext
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
NEXT_PUBLIC_CONTRACT_ADDRESS=0x437a12a6c95916649dA8D4362Edc6E0390650603
```

#### Server `.env`:
```plaintext
PORT=8000
MONGO_URL=MONGO_URL
JWT_SECRET=
```

### 6. Run the Project

#### Client
Start the client development server:

```bash
npm run dev
```

#### Server
Start the server:

```bash
npm start
```

The project will be available at `http://localhost:3000` for the client, and the server will run on `http://localhost:8000`.

## Project Structure

The project is organized into two main folders:

- **Client**: Contains the Next.js front-end application that interacts with the blockchain and server.
- **Server**: Contains the Express.js back-end application that handles API requests, user authentication, and database management.

## Dependencies

### Client Dependencies
```json
{
  "@reduxjs/toolkit": "^2.2.6",
  "axios": "^1.7.2",
  "next": "14.2.4",
  "react": "^18",
  "react-dom": "^18",
  "react-redux": "^9.1.2",
  "swiper": "^11.1.7",
  "web3": "^4.13.0"
}
```

### Server Dependencies
```json
{
  "@types/bcryptjs": "^2.4.6",
  "@types/cors": "^2.8.17",
  "@types/express": "^4.17.21",
  "@types/jsonwebtoken": "^9.0.6",
  "@types/mongoose": "^5.11.97",
  "@types/uuid": "^10.0.0",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.4.4",
  "ngrok": "^5.0.0-beta.2",
  "uuid": "^10.0.0",
  "zod": "^3.23.8"
}
```

### Dev Dependencies
```json
{
  "@types/node": "20.14.10",
  "@types/react": "18.3.3",
  "@types/react-dom": "^18",
  "eslint": "^8",
  "eslint-config-next": "14.2.4",
  "postcss": "^8",
  "tailwindcss": "^3.4.1",
  "typescript": "5.5.3"
}
```

## Usage

1. Interact with the front-end application by visiting the homepage at `http://localhost:3000`.
2. MetaMask will prompt for payment authorization when interacting with fundraisers.
3. The back-end server handles user requests, JWT authentication, and stores fundraising data.

## License

This project is licensed under the ISC License.


## Version 1.0.0 - Production Ready
