const user = require('./user.mutation');
const watchlist = require('./watchlist.mutation');
const keepwatchinglist = require('./keepwatchinglist.mutation');
const datas = require('./datas.mutation');
const request = require('./request.mutation');

const Mutation = {
    ...user,
    ...watchlist,
    ...keepwatchinglist,
    ...datas,
    ...request,
};

module.exports = Mutation;
