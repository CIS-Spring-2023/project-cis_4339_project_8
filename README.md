# Data Platform Project Setup

This project has been developed over time by students in the CIS 4339 course.

The current iteration is based on development done by Elliot Farmer Garcia, Agatha	Molski and Chris	Blanco in Fall of 2022.

Requirements:

This project uses NodeJS and MongoDB.

## Backend Node Application
```
cd backend
```
Follow instructions in backend README for setup and running as a local instance.
For our project, the .env file that you are required to make contains:
MONGO_URL = mongodb+srv://sprint3UN:ZSzm1RdCBep3iww2@sprint3.kdvc4gy.mongodb.net/test
PORT = 3000
ORG = "6789"

## Frontend Vue 3 Application
```
cd frontend
```
Follow instructions in frontend README for setup and running as a local instance.
For our project, the .env file that you are required to make contains VITE_ROOT_API=http://localhost:3000

```
remember to npm install to install the all dependencies for this project 
```

## Sprint 2 Portion:
In accordance with the requirements of Sprint 2, we have successfully incorporated several features into the existing front-end implementation. Specifically, the login portion, dashboard portion, and services portion have been integrated.

The login component has been designed to provide authentication functionality, whereby the user can be identified as either a "Viewer" or an "Editor", the log-in information for both are listed underneath the login portion for ease of access to the graders. A Viewer has access to features such as dashboard viewing, client searching, event discovery, and service browsing. An Editor, on the other hand, can perform all the functions of a Viewer, as well as create new events and services. Within the service creation module, Editors are able to edit, add, and soft delete services, which dynamically populate the "Services Offered at Event" section of the create event form.

To ensure ease of use, a logout navigation button has been included in the application. Upon clicking this button, users are prompted to confirm their decision to log out of the system.

## Sprint 3 Portion:
Using the new requirements for the third sprint, this third sprint involves expanding the backend API, setting up MongoDB, and adding new functionality to the API services. This will integrate the new services with the existing backend code and will be reflected in the API documentation for the extensions using Postman. 

## Postman Documentation:
https://documenter.getpostman.com/view/23048259/2s93Y5RgDc
