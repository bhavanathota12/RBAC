Role Based Access Control UI


Overview
This Project is Admin Dashboard that enables efficient user management with role based access control(RBAC) the dashboard allows to resources based on the roles of individual users with in an organization.
An RBAC UI is designed to provide administrators with a user-friendly interface to manage users, roles, and permissions efficiently.This interface is fully responsive ensuring usability across the desktop devices

Table of Contents
.Features 
.Technologies Used
.Installation
.Usage
.How to Run


Features
>User Management: Admin can add,edit and delete the user accounts
>Role Management: Manage the roles,including viewing, editing and deleting roles
>Permissions: Manages the permissions including viewing, adding, editing and deleting permissions
>API Integration: axios is used to make HTTP request to the backendAPI for CRUD operations on users,roles, and permissions

Technologies Used
.Frontend:React.js
.Backend:Node.js with Express
.DataBase:MongoDB
.Styling:Material UI and custom CSS responsive design
.Version Control: Git & Github

Installation

Prerequisites
Ensure you have dollowed installing on the machine

>Node.js(v20 or later)
>npm(Node Package Manager)
>MongoDB(for local development)

Step1:Navigate the ProjectDirectory

change to the project directory
cd rbac-ui

Step2:Install Dependencies

Run the following command to install the necessary dependencies for both frontend and backend:

npm install

Step3: Set up the Environment Variables

Create a .env file in the root of your project directory and configure the required environment variabls, such as MongoDB connection and string and port settings.The .env file should look something like this:

MONGODB_URI=mongodb://localhost:27017/rbac-db
PORT=5000

Step4:Github Repository

https://github.com/bhavanathota12/RBAC.git


Usage

After setting up environment variables, you can start the application

How To Run

Step1:Start the Backend Server

Navigate the server directory and start the backend server
cd backend
node server.js

Step2: Start the Frontend

In new terminal window, navigate the client directory and start the application
cd rbac-ui
npm start

Step3: Access the application
Open your web browser and go to http://localhost:3000/ to access the application







