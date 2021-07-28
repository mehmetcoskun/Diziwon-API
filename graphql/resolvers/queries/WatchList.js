const WatchList = {
    info: async (parent, args, { Data }) => {
        return await Data.findOne({
            where: { id: parent._id },
            order: [['id', 'DESC']]
        });
    }
};

module.exports = WatchList;
