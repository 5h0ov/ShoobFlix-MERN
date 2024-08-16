# ShoobFlix-MERN
This is a clone version of Netflix Website using MERN Stack and Tailwind CSS. 

Features:
- Users can search from movies or tv shows from anywhere in the website via the search bar in the Navbar
- In this clone project, users can view the trailers of said movie or tv show they want to search for
- I have used JWT( JSON Web Token) for the authentication process of the user and have added the concept of cookies which will expire after 12 Days if logged in
- Users can add the movies and tv shows they love the most to their favourites and also delete them or view them later by visiting the Favourites Page.
- To mimic the concept of seasons in the Watch Page the trailers will appear randomly each time user refreshes inside different Seasons(minimum: 3 and minimum 1 in each Season)
- There is a working Profile Edit Page where the User can use a different avatar and change their usernames. They cant change password and email for now.
- There are carousel for the different categories which has a simple working version of infinite scrolling(very primitive implementation).
- On signup you will get option to select an avatar or you can skip to select it later from the avatar icon in the top right.
- This uses TMDB Api to fetch movie/tv show details.
- Uses MERN Stack and Tailwind CSS for quick and easy styling.
- Features tooltips for user experience
- And its almost kind of responsive except the navbar...didn't fix the navbar 

# How to Run it Locally?
- Clone this repo to your local system
- go to the .env template file provided in the repo and paste your own api keys and mongodb uri to make it work in local host
- Open Two Terminals ( for better accessibility )
- In one of them write `npm install` or `npm i`
- In the other write `cd frontend` then `npm install` or `npm i`
- Then in the terminal where you are in the **frontend** folder, write `npm run dev` for the frontend
- And in the other terminal write `npm run dev:server` for the server



## Screenshots:

![image](https://github.com/user-attachments/assets/a2d83d36-c219-41ad-840c-bdfb8638b4f0)

![image](https://github.com/user-attachments/assets/a62e3d05-b30f-4095-8582-959468f21160)

![image](https://github.com/user-attachments/assets/0e7f98ba-a5ba-4756-a20d-9db0871b92ca)

![image](https://github.com/user-attachments/assets/5fc4e855-376b-4000-a529-4c3a60da45db)

![image](https://github.com/user-attachments/assets/7b250b00-998f-4037-927d-a5764dfb8dd3)

![image](https://github.com/user-attachments/assets/7b250b00-998f-4037-927d-a5764dfb8dd3)

