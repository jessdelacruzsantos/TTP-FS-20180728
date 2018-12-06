const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const { db , User} = require('./db');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})
const passport = require('passport')
const compression = require('compression')
const app = express();

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(volleyball);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

    // compression middleware
  app.use(compression())
    
    
    // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: true
    })
  )
  
  app.use(passport.initialize())
  app.use(passport.session())
  
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'));
  
  // static file serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));
  
  app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'))
  })
}



const start = async () => {
  const PORT = process.env.PORT || 3000;
  await sessionStore.sync()
  await db.sync();
  await createApp()
  app.listen(PORT, err => {
    if (err) console.error(err);
    else console.log('server is listening on port', PORT);
  });
};

start();
