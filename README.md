## Project Name & Pitch

Mina

A web app created to provide tools for content creators to use in order to grow their business through interactions and analytics.

## Project Status

This project is currently in development. Users can currently sign up / sign in and update their profiles to include their information, profile picture, and a short about me. Functionality for the "Connect" tool is currently in progress.

## Project Screen Shot(s)

#### Example:   

Login:
<img width="1662" alt="Screen Shot 2023-03-26 at 4 50 21 PM" src="https://user-images.githubusercontent.com/119630103/227809775-3b117a37-3ef2-4108-8c20-b3f6afa0f986.png">

Profile page:
<img width="1658" alt="Screen Shot 2023-03-26 at 4 51 15 PM" src="https://user-images.githubusercontent.com/119630103/227809783-68e6ea72-76be-4d04-8714-c765ef741d07.png">

## Tools to be implemented

- Connect: This will be a place where creators are able to see other creators in their state and can choose to send a message to set up a collaboration or not. The inital idea is something similar to a dating app but just for the collaborations between content creators that use the web app.
- Message: This will be a messaging tool that allows the user to message content creators that they have accepted in the "Connect" tool. 
- Dashboard: This will a dashboard that will be a hub for analytics and would show the combined and seperated analytics for any user connected social medias (youtube, tiktok, twitch, etc.). <---- Allowed social medias are based on if the companies have API that allow for getting the user's video data!

## Reflection

This is a side project with the intention of getting experience with building out a project idea. Project goals were to using new technologies and strengthening skills learned from first job (react, APIs, html, reading documentation and learning new technology).

The idea of this project is to build a dashboard that allowed for the people to see their tiktok / youtube / instagram analytics (seperated and combined). The idea to also add a feature that allowed for creators to collab with each other was also added. The process was started by finding a free react template that I could plug my own backend to it. 

While there have been a few different challenges thus far, the most difficult one has been trying to figure out a better system for querying the realtime database with firebase. Currently, I am just looping through all accounts and only displaying the profiles that live in the same state as the user. However, this is very ineffecient as the user count increases because of the O(N) that this current system has. Still working on trying to get a more effecient way.

Overall, the technologies implemented in this project are React, Firebase, and some javascript. Eventually, I think it will be nice to add flask for a backend that will handle any api calls that need to be made for the data. I chose to find a premade react app so that I can focus more on the implementation and not really having to handle designing a whole frontend from scratch. 
