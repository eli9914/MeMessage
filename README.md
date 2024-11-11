# MeMessage

## Description
MeMessage is a real-time chat application designed to facilitate communication between users.
It allows users to register, log in, create groups, and send both direct and group messages. 
The system uses JWT authentication, Socket.io for real-time communication, and MongoDB for storing user, group, and message data. MeMessage provides a user-friendly interface for easy management of messages and groups.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contact](#contact)

## Installation
Follow these steps to set up the project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/eli9914/MeMessage.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd MeMessage
    ```

3. **Install dependencies for the backend**:
    - Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
    - Install backend dependencies:
    ```bash
    npm install
    ```

4. **Install dependencies for the frontend**:
    - Navigate to the `frontend` folder:
    ```bash
    cd ../frontend
    ```
    - Install frontend dependencies:
    ```bash
    npm install
    ```

5. **Set up the backend server**:
    - Ensure MongoDB is installed and running.
    - Create a `.env` file in the `backend` directory and configure your environment variables (such as `MONGO_URI`, `JWT_SECRET`, and `PORT`).

6. **Start the project**:
    - First, navigate to the `backend` directory and start the server:
    ```bash
    cd ../backend
    npm start
    ```
    - Then, navigate to the `frontend` directory and run the frontend:
    ```bash
    cd ../frontend
    npm run dev
    ```

This will start both the backend server and the frontend.

## Usage
### Login
1. The project will automatically open the login page in your default browser.
2. Enter your username and password to log in.
3. If the credentials are correct, you will be redirected to the Chat page.

### Register
1. If not a registered user,you can register at the register page.
2. Enter your'e username,password and profile img url.
3. After the register, log in with your'e new user details.

### Messaging
1. You can send messages to individuals users or groups.
2. Real-time message updates are powered by Socket.io.
3. you can click on the message and delete it.

### Managing Groups
1. click on the '+' to open the 'create group' form.
2. Create new groups by filling out the form and clicking "Create Group".
3. View and manage messages within each group.

### Features
-User authentication with JWT
-Real-time messaging with Socket.io
-Group creation and management
-Send both direct and group messages
-User-friendly and responsive interface
-CRUD operations for managing groups and messages

### Contanc
Eli - eli9914@gmail.com
Project Link: https://github.com/eli9914/MeMessage
