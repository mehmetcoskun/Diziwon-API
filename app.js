const express = require('express');
const app = express();
require('dotenv').config();

const nodemailer = require('nodemailer');

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ejs = require('ejs');

const emailvalidator = require('email-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { combineObjects, search, timeFormat } = require('./utils/helpers');

const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');

const resolvers = require('./graphql/resolvers');

const sequelize = require('sequelize');
const Settings = require('./models/Settings');
const Data = require('./models/Data');
const Movie = require('./models/Movie');
const Series = require('./models/Series');
const User = require('./models/User');
const Avatar = require('./models/Avatar');
const WatchList = require('./models/WatchList');
const KeepWatchingList = require('./models/KeepWatchingList');
const Request = require('./models/Request');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const LANGUAGE_TR = 'tr-TR';

const POSTER_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

const IMDB_API_URL = 'https://www.imdb.com/title/{0}/';

const TMDB_API_FIND_URL = `https://api.themoviedb.org/3/find/{0}?api_key=${TMDB_API_KEY}&language={1}&external_source=imdb_id`;

const API_URL = process.env.API_URL;

const MOVIE_API_URL = process.env.MOVIE_API_URL;

const UPCOMINGS_URL = process.env.UPCOMINGS_URL;

const MAIL_TEMPLATE_ACCOUNT_VERIFY = __dirname + '/template/accountVerify.ejs';
const MAIL_TEMPLATE_ADD_MOVIE = __dirname + '/template/addMovie.ejs';
const MAIL_TEMPLATE_REQUEST = __dirname + '/template/request.ejs';

const server = new ApolloServer({
    typeDefs: importSchema('./graphql/schema.graphql'),
    resolvers,
    context: {
        Settings,
        Data,
        Movie,
        Series,
        User,
        Avatar,
        WatchList,
        KeepWatchingList,
        Request,
        sequelize,
        nodemailer,
        ejs,
        emailvalidator,
        bcrypt,
        jwt,
        fetch,
        cheerio,
        combineObjects,
        search,
        timeFormat,
        TMDB_API_KEY,
        LANGUAGE_TR,
        POSTER_URL,
        IMDB_API_URL,
        TMDB_API_FIND_URL,
        API_URL,
        MOVIE_API_URL,
        UPCOMINGS_URL,
        MAIL_TEMPLATE_ACCOUNT_VERIFY,
        MAIL_TEMPLATE_ADD_MOVIE,
        MAIL_TEMPLATE_REQUEST,
    },
    //introspection: true,
    //playground: true,
});

server.applyMiddleware({ app });
/*
server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
        origin: true,
        credentials: true,
    },
});
*/

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
});
