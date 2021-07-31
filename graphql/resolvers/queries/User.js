const User = {
    watchlist: async (parent, args, { WatchList }) => {
        return await WatchList.findAll({
            where: { user_id: parent.id },
            order: [['id', 'DESC']],
        });
    },
    keepwatchinglist: async (parent, args, { KeepWatchingList }) => {
        return await KeepWatchingList.findAll({
            where: { user_id: parent.id },
            order: [['id', 'DESC']],
        });
    },
};

module.exports = User;
