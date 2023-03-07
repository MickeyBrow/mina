# mina

- March 5 2023 \
    This project is suppose to be an analytics tool for aspiring influceners. The plan so far is to have 2 main sections. The dashboard which will show the analytics of all linked accounts. This would show things like total views, total likes, total engagments (whatever I can get from the different APIs obviously). Ideally, I would also like to allow for the user to look at the seperate platforms analytics as well.

    The second section will be what im calling "Connect". This would be like a dating app but for content creators to link up for collabs. The second could be a tinder clone until I am able to think of something more creative for it.

    Another section would have to be a profile section that allows for the content creator to customize their profile for the connect part. Basically just allowing for the user to upload a profile picture, add a bio, and their location that they want to look at for the connect.\

- March 6 2023 \
    Trying to set up a realtime database to the app. This would allow for me to get the current users data using the uid that is passed in the URL. The intial step is to try and get the users name, email, and uid to be saved in the DB when ever their account is made on the register page. 
    
    For some reason the DB is not saving the users data when creating the account. Need to look at a tutorial or something to see how other people implement the DB. 
    
    (Later in the day) Got the DB working so now when a new account is made, a new field is made under the profile folder with the uid, name, and email.
    
    Also did some updating to the profile page so the info from the DB populates the page. Then started the barebones for allowing the user to update their information. Still have to finish that though.
