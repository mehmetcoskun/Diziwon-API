const Movie = {
    watch: async (parent, args, { Movie }) => {
        return await Movie.findOne({ where: { imdb_id: parent.imdb_id } });
    }
};

module.exports = Movie;
