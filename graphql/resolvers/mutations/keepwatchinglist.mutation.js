module.exports = {
    addKeepWatchingList: async (parent, args, { KeepWatchingList }) => {
        return (await KeepWatchingList.create({
            user_id: args.user_id,
            _id: args._id,
            season: args.season,
            episode: args.episode,
            updatedAt: new Date(),
        }))
            ? true
            : false;
    },
    updateKeepWatchingList: async (parent, args, { KeepWatchingList }) => {
        return (await KeepWatchingList.update(
            {
                season: args.season && args.season,
                episode: args.episode && args.episode,
                updatedAt: new Date(),
            },
            {
                where: {
                    user_id: args.user_id,
                    _id: args._id,
                },
            }
        ))
            ? true
            : false;
    },
    removeKeepWatchingList: async (parent, args, { KeepWatchingList }) => {
        return (await KeepWatchingList.destroy({
            where: {
                user_id: args.user_id,
                _id: args._id,
            },
        }))
            ? true
            : false;
    },
};
