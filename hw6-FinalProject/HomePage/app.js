const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
//app.use('/', express.static('HomePage'));

const pageNames = [
    'AchievementsPage',
    'BonusEventsPage',
    'FriendsPage',
    'HomePage',
    'LoginPage',
    'NotificationsPage',
    'ProfilePage'
];

pageNames.forEach(pageName => {
    app.use(`/${pageName}`, express.static(pageName));
});

// Page it first routes to
app.get('/', (req, res) => {
    res.redirect('/LoginPage/Login.html');
});

//Routing to diff pages
pageNames.forEach(pageName => {
    app.get(`/${pageName}`, (req, res) => {
        res.redirect(`/${pageName}`);
    });
});

//This is for the task database
const taskDB = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'taskdb',
    password: '1234',
    port: 5432,
});


app.use(bodyParser.json());



app.post('/addTask', async (req, res) => {
    const { text, month, day } = req.body;
    const curUser = req.headers.authorization;
    const bool = false;

    try {
        //const result = await taskDB.query('INSERT INTO tasks (text, month, day, userID) VALUES ($1, $2, $3) RETURNING *', [text, month, day]);
        const result = await taskDB.query('INSERT INTO tasks (text, month, day, completed, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *', [text, month, day, bool, curUser]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/loadTasks', async (req, res) => {
    const curUser = req.headers.authorization;
    try {
        //const result = await taskDB.query(`SELECT * FROM tasks`);
        const result = await taskDB.query(`SELECT * FROM tasks WHERE userid = $1`, [curUser]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error loading tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/updateTask/:id', async (req, res) => {
    const taskId = req.params.id;
    const { text, month, day, completed } = req.body;

    try {
        const result = await taskDB.query('UPDATE tasks SET text = $1, month = $2, day = $3, completed = $4 WHERE id = $5 RETURNING *', [text, month, day, completed, taskId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deleteTask/:id', async (req, res) => {
    const taskId = req.params.id;
    const curUser = req.headers.authorization;
    try {
        //const result = await taskDB.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId]);
        const result = await taskDB.query('DELETE FROM tasks WHERE id = $1 AND userid = $2 RETURNING *', [taskId, curUser]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// this is for the login database
const loginDB = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'logininfo',
    password: '1234',
    port: 5432,
});

app.post('/checkLogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await loginDB.query('SELECT * FROM logininfo WHERE username = $1 AND password = $2', [username, password]);

        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error checking login information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deleteLogin/:username', async (req, res) => {
    console.log(req.params);
    const username = req.params.username.trim();
    console.log(username);
    try {
        
        const result = await loginDB.query('DELETE FROM logininfo WHERE username = $1 RETURNING *', [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Login not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


async function checkValidLoginCreation(username) {
    try {
        const query = 'SELECT * FROM logininfo WHERE username = $1';
        const result = await loginDB.query(query, [username]);
        return result.rows.length === 0;
    } catch (error) {
        console.error('Error checking username existence:', error);
        return false;
    }
}

app.post('/addLogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const isValid = await checkValidLoginCreation(username);

        if (!isValid) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const result = await loginDB.query('INSERT INTO logininfo (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding your login information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/updateLogin', async (req, res) => {
    const {newUser , oldUser } = req.body;

    try {
        const checker = await checkValidLoginCreation(newUser);
        if (!checker) {
            return res.status(400).json({ error: 'New username already exists' });
        }

        const updateResult = await loginDB.query('UPDATE logininfo SET username = $1 WHERE username = $2 RETURNING *',[newUser, oldUser]
        );

        res.json(updateResult.rows[0]);
    } catch (error) {
        console.error('Error updating', error);
        res.status(500)
    }
});

app.post('/addPoints', async(req, res) => {
    const {username, totalPoints} = req.body;
    try {
        const result = await loginDB.query('UPDATE logininfo SET totalpoints = $1 WHERE username = $2',[totalPoints, username]);
        res.json({ success: true, message: 'Points added successfully', result: result.rows[0] });
    } catch (error) {
        console.log("Error adding points", error);
        res.status(500).json({success: true, message: 'Points not added successfully', result: result.rows[0]});
    }
})

app.get('/getPoints', async (req, res) => {
    try {
        const result = await loginDB.query('SELECT username, totalpoints FROM logininfo');
        const points = result.rows.map(row => ({ username: row.username, points: row.totalpoints }));
        res.json({ points });
    } catch (error) {
        console.error('Error fetching points:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



const achievements = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postfeed',
    password: '1234',
    port: 5432,
  });

  app.get('/getPosts', async (req, res) => {
    try {
        const result = await achievements.query('SELECT * FROM posts');
      
        const posts = result.rows.map(row => ({
            post_id: row.post_id,
            content: row.content,
            comments: row.comments,
        }));

        res.json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/addPost', async (req, res) => {
    const { content, comments } = req.body;
  
    try {
      const result = await achievements.query(
        'INSERT INTO posts (content, comments) VALUES ($1, $2) RETURNING *',
        [content, comments]
      );
  
      const newPost = {
        post_id: result.rows[0].post_id,
        content: result.rows[0].content,
        comments: result.rows[0].comments,
      };
  
      res.status(201).json({ post: newPost });
    } catch (error) {
      console.error('Error adding post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  


app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// Start the server.
app.listen(port, () => {
    // This is totally just for fun!
//     const banner = `
//     .d8888b.                            888      888      888          
//     d88P  Y88b                           888      888      888          
//     Y88b.                                888      888      888          
//      "Y888b.    .d8888b 888d888  8888b.  88888b.  88888b.  888  .d88b.  
//         "Y88b. d88P"    888P"       "88b 888 "88b 888 "88b 888 d8P  Y8b 
//           "888 888      888     .d888888 888  888 888  888 888 88888888 
//     Y88b  d88P Y88b.    888     888  888 888 d88P 888 d88P 888 Y8b.     
//      "Y8888P"   "Y8888P 888     "Y888888 88888P"  88888P"  888  "Y8888                                                                       
//   `;
    const msg = `Server started on http://localhost:${port}`;
    console.log(msg);
    //const rainbow = chalkAnimation.rainbow(msg);
  
    // Have the rainbow stop so we can log stuff to the console.
    // setTimeout(() => {
    //   rainbow.stop(); // Animation stops
    // }, 2000);
  });
