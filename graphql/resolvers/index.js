const Query = require('./queries/Query');
const Movie = require('./queries/Movie');
const Series = require('./queries/Series');
const WatchList = require('./queries/WatchList');
const KeepWatchingList = require('./queries/KeepWatchingList');
const User = require('./queries/User');
const Mutation = require('./mutations/index');

module.exports = {
    Query,
    Movie,
    Series,
    WatchList,
    KeepWatchingList,
    User,
    Mutation,
};
