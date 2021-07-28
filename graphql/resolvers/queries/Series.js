const Series = {
    watch: async (parent, args, { Series }) => {
        return await Series.findAll({ where: { imdb_id: parent.imdb_id } });
    }
};

module.exports = Series;
