module.exports = {
    addWatchList: async (parent, args, { WatchList }) => {
        return (await WatchList.create({
            _id: args.data._id,
            user_id: args.data.user_id
        }))
            ? true
            : false;
    },
    removeWatchList: async (parent, args, { WatchList }) => {
        return (await WatchList.destroy({
            where: {
                _id: args.data._id,
                user_id: args.data.user_id
            }
        }))
            ? true
            : false;
    }
};
