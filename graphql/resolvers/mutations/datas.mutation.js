module.exports = {
    incrementCounter: async (parent, args, { Data }) => {
        return (await Data.increment('counter', { where: { id: args.id } }))
            ? true
            : false;
    }
};
