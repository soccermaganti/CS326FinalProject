# Competitive Task Manager Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Database Setup](#database-setup)
7. [Usage Instructions](#usage-instructions)
8. [Troubleshooting](#troubleshooting)
9. [Conclusion](#conclusion)
10. [Idea Creation](#ideas)

## 1. Introduction <a name="introduction"></a>

Goal: To create an application that can help college students with tasks and make sure they stay on track to complete them. This is important because there are lots of people around the world that could use this to stay on track why else would they go to college if they only wanted to fail? It would be designed somewhat like the reminder app but with a social aspect to it and you can also have your own private tasks as well.

Task Ahead: To create a fun and social app that friends can use to help keep each other motivated. On each other’s profiles, they’ll have their list of things to do and people can leave comments below to give them some healthy reminders that they have things to do. Can also create a home page based on people you follow so it would be like an Instagram sort of design and on this home page, they can post any achievements that they got due to completing previous tasks. The tasks they complete will be output in a tree hierarchical order so everyone can see the process they took to achieve the result. Users can also read and comment on the post. 


## 2. Key Features <a name="key-features"></a>

1) Managing current daily tasks that need to be completed

3) Creating a hub for friends to post their current achievements and any messages they want to put publically

4) A competitive atmosphere to complete tasks as there is a leaderboard to track points earned by friends

5) Achievement-based system where individual accounts will be given certain trophies depending on their current number of tasks completed or points earned.


## 3. Architecture <a name="architecture"></a>

1) **Home Page**
   - This page links together the whole website as most of the events happen here.
   - **Task box**: I implemented this box by creating an area where any tasks you add are put here. On the left side, you can see that there is an entry form that takes in your input and then displays it within the task box. I added the y-overflow feature so that if the tasks take up more space on the screen, it allows you to scroll down.
   - **Task Achievement Page**: This section is where users can post their achievements or anything they would like to say to all the accounts that are friends with the user. By pressing previous or next you can switch between posts and currently comments need to be implemented if there is time.
   - **Calendar**: Gives brief insight into the current time and date and the weather in Boston, MA but can be changed to whatever you want.

2) **Point System**
- **Competitive Nature**: I decided to add a simple point system where users can compete against each other by completing tasks. As of right now, you can gain points just from completing tasks and they can in theory be anything. For every completed task, 5 points are added to your total. This is stored within the SQL user database which is then pulled to create a leaderboard.
- **Leaderboard**: This ranks users currently in the system by their points and then puts them in order. Your current rank is associated with certain achievements depending on where you are.

3) **Your Profile and Information**

- **Login Database**: Your profile is stored within a PostgreSQL database that has most of your information like point count for example. Username and password are also stored here and this allows for different profiles to be made. Each profile is given a unique_id which is the username that the person makes at account creation. This unique_id is what allows this app to be able to be used by multiple people and keep information separate. Tasks created by one user will not be shown to another who logs into their own account. 


### a) Original Wireframe UI I based the design off of
<img height="500" width="1000" position ="center" alt="image" src="https://github.com/soccermaganti/CS326FinalProject/assets/87458991/91cb3bb3-2475-4df6-a5e2-17b3786bb2cf">



### b) Current implementation
<img height="500" width="1000" position ="center"  alt="image" src="https://github.com/soccermaganti/CS326FinalProject/assets/87458991/026f93c5-b1b9-458f-8676-2b6918729755">



## 4. Installation <a name="installation"></a>

### Prerequisites

1) Node.JS
2) Express.JS
3) PostgreSQL and/or PGadmin

### Steps to Download and Install Project

```bash
# Installation Steps
1. Clone the repository: `git clone https://github.com/soccermaganti/CS326FinalProject.git` or download the zip file instead
2. Navigate to the project directory: `cd hw6-FinalProject`
3. Install dependencies in the following order: `npm install`, `npm install express`, `npm install morgan`, 
4. Start the localhost server by doing node HomePage/app.js and then open it up in your browser 
```

## 5. Configuration <a name="configuration"></a>

```bash
Make sure all naming conventions are accurate when making database and tables otherwise it won't work.
```

## 6. Database Setup <a name="database-setup"></a>

```bash
# Database Setup
1. Install PostgreSQL: `sudo apt-get install postgresql`
2. Login with your account information and then create 3 new databases: `CREATE DATABASE logininfo, CREATE DATABASE postfeed, CREATE DATABASE taskdb`
3. Switch into each respective database and create tables with these commands:
- CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    month INTEGER DEFAULT 0,
    day INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    userid VARCHAR(255) NOT NULL
);
- CREATE TABLE logininfo (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    totalpoints INTEGER
);
- CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    content TEXT,
    comments TEXT[]
);
4. Grant all permissions to the user to perform actions on the databases. username is your PostgreSQL username
- GRANT ALL PRIVILEGES ON DATABASE yourdatabase TO youruser;
```

## 7. Usage Instructions <a name="usage-instructions"></a>

1) **Adding Tasks**
  CRUD Operations - Create, Read, Update, Delete (This is how I implemented that in this project)
- Put your task text content into the first box and then add the day and month. It will then add that information to the database and display it in the box.
- Can delete a task by pressing the delete button and it deletes that task using your specific username
- Mark it as completed and it will update it to true
- Reload the page and it will load the tasks based on your username

2) **Adding Task Achievements**
  - When you first log in, it will load any posts from the database
  - You can add posts by pressing the add post Button after putting in some content. Currently, it doesn't differentiate between user to user so you have to add your name at the end like this for example. Ex. "Bought my first house - Sri"
  - Can switch between posts using the previous and next buttons
  - This information loads the same for all accounts so everyone can see the information you post on there.

3) **Logging in**
 - Need to create your own login information and then log in using that. It won't let you into the application if you don't.
 - The system uses unique usernames so you can't share the same username as someone else or it will alert you with an error
 - Make sure to use a strong password!

## 8. Troubleshooting <a name="troubleshooting"></a>

1) **Database setup**
- Make sure naming conventions are correct and create the database correctly. Need to have all the necessary columns otherwise it won't work. I provided the SQL above.

2) **Comments don't work currently so don't press it.**

## 9. Conclusion <a name="conclusion"></a>

Summarizing it all together, the Competitive Task Manager is a dynamic application that is designed to target college students' motivation by creating a competitive environment. The documentation above provides instructions to install, configure, and set up the database. Users can easily manage their tasks, share any achievements they have, and be a part of some friendly competition. I aim to create a positive and collaborative environment for everyone to succeed in their academic journey.

## 10. Ideas I had when creating the Project and the step-by-step things I did to implement them (Pretty informal idea creation) <a name="ideas"></a>

1. Basically need to create the calendar and then based on the day of the calendar, I’ll create preset bonus days based on the day. (Completed)

2. For my todo list,
    1. Add the ability for a date when the reminder needs to be done. (Completed)
    2. Then I can create a notifications page that will let you know your priority based on the date and priority level (Completed)

3. Need to figure out how to navigate to different pages (Completed)

4. Creating a login Database
    1. Make login SQL database (done)
    2. Make express routes to add to the database (done)
    3. Connect the login database to the client side stuff (done)
    4. Figure out how to make js switch from login to create an account and back to the login page so they can log in with their account info. (In process)
    5. Make it so you can delete profile information from the profile screen  (in process)
    6. and when you delete your account, it brings you back to the login screen (in process)

5. Creating Task Achievement Feed
    1. Set up buttons and commenter Incorrect position (Done)
    2. Set up the database for the achievements and the comments underneath them (done)
    3. Create event listeners (done)
    4. Create express routes as well as any functions needed (done)
    5. Allow for buttons to switch between posts (done)
    6. Get comments to work by adding a new thing

6. Creating a Point leaderboard between accounts
    1. Give points to each account (done)

7. Making it so personal tasks only are shown for one account and not all accounts ( Created multi-account access now by adding userid to sql database to sort the tasks based on the account) (Done)

9. Add friends and save each individual account

10. Added ability to change username (Done)

