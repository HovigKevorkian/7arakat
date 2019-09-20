import express from 'express'
import cookieParser from 'cookie-parser' // parses cookies
import session from 'express-session' // parses sessions
// import favicon from 'serve-favicon' // serves favicon
import cors from 'cors' // allows cross-domain requests
import createError from 'http-errors' // better JS errors
import path from 'path'

const app = express(); // create a new app

const IS_PRODUCTION = app.get('env') === 'production'

if (IS_PRODUCTION) {
  app.set('trust proxy', 1) // secures the app if it is running behind Nginx/Apache/simila
}
app.use(cors()); // allows cross domain requests
app.use(express.json()); // allows POST requests with JSON
app.use(express.urlencoded({ extended: false })); // allows POST requests with GET-like parameters
app.use(cookieParser()); // Parses cookies
app.use(express.static(path.join(__dirname, '../public'))); // <-- location of public dir

app.use(session({ // handles sessions
  secret: 'keyboard cat', // <-- this should be a secret phrase
  cookie: { secure: IS_PRODUCTION }, // <-- secure only in production
  resave: true,
  saveUninitialized: true
}))


export default app;
