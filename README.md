# CS 326 Final Project Documentation

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


### a) Original Wireframe UI I based the design of
<img height="500" width="1000" position ="center" alt="image" src="https://github.com/soccermaganti/CS326FinalProject/assets/87458991/91cb3bb3-2475-4df6-a5e2-17b3786bb2cf">



### b) Current implementation
<img height="500" width="1000" position ="center" alt="image" src="https://github.com/soccermaganti/CS326FinalProject/assets/87458991/49d4c159-f062-4d10-9821-55684134aa46">


## 4. Installation <a name="installation"></a>

### Prerequisites

1) Node.JS
2) Express.JS
3) PostgreSQL and/or PGadmin

### Steps

Provide step-by-step instructions for setting up the project locally. Include commands, configurations, and any special considerations. This section should help users get the application up and running quickly.

```bash
# Example Installation Steps
1. Clone the repository: `git clone https://github.com/soccermaganti/CS326FinalProject.git`
2. Navigate to the project directory: `cd CS326FinalProject`
3. Install dependencies: `npm install`
4. Start the localhost server by doing node server/app.js and then open it up in your browser
```

## 5. Configuration <a name="configuration"></a>

Explain how users can configure the application. This includes environment variables, configuration files, or any settings that need to be adjusted for the application to work correctly.

```bash
# Example Configuration
1. Create a `.env` file in the project root.
2. Add the following environment variables:
   - `DATABASE_URL=your_database_connection_string`
   - `API_KEY=your_api_key`
3. Save the file.
```

## 6. Database Setup <a name="database-setup"></a>

```bash
# Example Database Setup
1. Install PostgreSQL: `sudo apt-get install postgresql`
2. Login with your account information and then create 3 new databases: `CREATE DATABASE logininfo, CREATE DATABASE postfeed, CREATE DATABASE taskdb`
3.  Switch into each respective database and create tables with these commands:
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
    Password VARCHAR(255) NOT NULL
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

Explain how users can interact with the application. Include information on commands, API endpoints, or any user interfaces. Provide examples to illustrate typical use cases.

## 8. Troubleshooting <a name="troubleshooting"></a>

List common issues users might encounter and provide solutions. Include error messages, logs, or any other relevant information that can help users troubleshoot problems.

## 9. Conclusion <a name="conclusion"></a>

Summarize the key points covered in the documentation. Encourage users to reach out for support or contribute to the project.

