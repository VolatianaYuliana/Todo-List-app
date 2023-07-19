# Todo list
This project is a Todo List app with authentication functionality. It allows users to create, edit and delete to-dos.

## Features
- Create a user account
- Log in to an existing user account
- View list of personal task
- Add a new task
- Mark a task as complete
- Edit an existing task
- Delete a task

## Technologies used
### Client side
- Vue.js
- Vite
- Axios

### Server side
- Node.j
- Express.j
- Docker
- ORM Prism
- MySQL

## Setup
1. Clone the GitHub repository:
```
git clone https://github.com/VolatianaYuliana/social-media-app.git
```
2. Navigate to the project directory.
```
cd social-media-app
```

### Client side
1. Install dependencies.
```
cd client
npm install
```
2. create an .env file and add the following contents to it:
```
VITE_SERVEUR=http://localhost:3000
```
3. Start the development server.
```
npm run dev
```
4. The client application will be accessible at the following address: http://localhost:5173 .

### Server side
1.Install dependencies.
```
cd server
npm install
```
2. create an .env file and add the following contents to it:
```
DATABASE_URL=mysql://mariomans:root@localhost:3308/socialmedia
PORT=3000
CLIENT=http://localhost:5173
```
3.Start the server.
```
npm run dev
```

4.The server will be accessible at the following address: http://localhost:3000 .

## Contributor
[Mario](https://github.com/manzcode)

[Anja](https://github.com/anjalima9)





