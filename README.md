# How to start service locally?

1. Open terminal  
`cd client`  
`npm i`  
`npm start`  

2. Open another terminal instance  
`cd server`  
`npm i`  
`npm start`  

## You start with http://localhost:3000/

# Flotrack explained
## Database
Flowtrack - list of all services, on the site they are filtered by nickname
Flowtrack_services - list of all services added by us and by user
Flowtrack_users - list of users, passwords and avatars

## / - Home page

Shows "promoted" services, that user can add to its library

## Sing in

In the header on the right there is a button, there you can log in

If user need to register, there is a 'Create account' button. There user can add an avatar by the linkEverything is saved to the database.

Upon login, a token is created in localstorage, so user can even leave the browser and still be logged in. By clicking on your account, we go to the library, as well as by clicking on 'My subs'

## My subs

Open the page with subscriptions. If user is not logged in, he will be redirected to login page

BE retreives all posts from Flotrack table, where there is users nickname

## Update & Add

If user clicks on any of the subscriptions, user can see Delete and Update buttons.

## About

Just a funny page, there is a contact form. (not sat up)