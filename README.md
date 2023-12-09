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

Explain the high-level architecture of your application. Include information on the components, modules, and their interactions. Diagrams can be helpful to visualize the architecture.

Original Wireframe UI I based the design of



Current implementation
<img width="1439" alt="image" src="https://github.com/soccermaganti/CS326FinalProject/assets/87458991/49d4c159-f062-4d10-9821-55684134aa46">


## 4. Installation <a name="installation"></a>

### Prerequisites

List any software, tools, or dependencies that need to be installed before setting up your application.

### Steps

Provide step-by-step instructions for setting up the project locally. Include commands, configurations, and any special considerations. This section should help users get the application up and running quickly.

```bash
# Example Installation Steps
1. Clone the repository: `git clone https://github.com/your-username/your-project.git`
2. Navigate to the project directory: `cd your-project`
3. Install dependencies: `npm install`
4. ...
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

Provide instructions for setting up and connecting to the chosen database system. Include any necessary scripts or commands for database initialization.

```bash
# Example Database Setup
1. Install PostgreSQL: `sudo apt-get install postgresql`
2. Create a new database: `createdb your_database_name`
3. Run database migrations: `npm run migrate`
4. ...
```

## 7. Usage Instructions <a name="usage-instructions"></a>

Explain how users can interact with the application. Include information on commands, API endpoints, or any user interfaces. Provide examples to illustrate typical use cases.

## 8. Troubleshooting <a name="troubleshooting"></a>

List common issues users might encounter and provide solutions. Include error messages, logs, or any other relevant information that can help users troubleshoot problems.

## 9. Conclusion <a name="conclusion"></a>

Summarize the key points covered in the documentation. Encourage users to reach out for support or contribute to the project.

