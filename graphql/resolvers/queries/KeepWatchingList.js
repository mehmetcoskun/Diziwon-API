const KeepWatchingList = {
    info: async (parent, args, { Data }) => {
        return await Data.findOne({
            where: { id: parent._id },
        });
    },
};

module.exports = KeepWatchingList;
