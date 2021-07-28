const Query = {
    Settings: async (parent, args, { Settings }) => {
        return await Settings.findOne();
    },
    datas: async (parent, args, { Data, sequelize, sequelize: { Op } }) => {
        return await Data.findAll({
            where:
                args.sortByType && args.genre
                    ? {
                          [Op.and]: [
                              {
                                  type: args.sortByType,
                              },
                              {
                                  genres: {
                                      [Op.substring]: args.genre,
                                  },
                              },
                          ],
                      }
                    : args.sortByType
                    ? {
                          type: args.sortByType,
                      }
                    : args.search
                    ? {
                          [Op.or]: [
                              {
                                  title: {
                                      [Op.substring]: args.search,
                                  },
                              },
                              {
                                  original_title: {
                                      [Op.substring]: args.search,
                                  },
                              },
                          ],
                      }
                    : args.genre
                    ? {
                          genres: {
                              [Op.substring]: args.genre,
                          },
                      }
                    : null,
            order: args.sort
                ? [['id', args.sort]]
                : args.featured
                ? [['counter', args.featured]]
                : args.sortByType && args.random
                ? sequelize.fn('RAND')
                : args.sortByType
                ? [['id', 'DESC']]
                : args.random
                ? sequelize.fn('RAND')
                : null,
            limit: args.limit ? args.limit : null,
            offset: args.offset ? args.offset : null,
        });
    },
    movie: async (parent, args, { Data }) => {
        return await Data.findByPk(args.id);
    },
    series: async (parent, args, { Data }) => {
        return await Data.findByPk(args.id);
    },
    getUsers: async (parent, args, { User }) => {
        return await User.findAll({
            order: args.sort ? [['last_active', args.sort]] : null,
            limit: args.limit ? args.limit : null,
            offset: args.offset ? args.offset : null,
        });
    },
    getUserDetail: async (parent, args, { User }) => {
        return await User.findByPk(args.id);
    },
    getUser: async (parent, args, { User, jwt }) => {
        const { result } = await new Promise((resolve) =>
            jwt.verify(
                args.token,
                process.env.JWT_SECRET_KEY,
                (error, result) => {
                    resolve({
                        result,
                    });
                }
            )
        );

        const user = await User.findOne({ where: { id: result.id } });
        if (user) {
            if (user.dataValues.status == 'active') {
                return user.dataValues;
            } else {
                throw new Error('Hesabınız Devre Dışı Bırakılmış');
            }
        } else {
            throw new Error('Hesabınız Silinmiş');
        }
    },
    avatars: async (parent, args, { Avatar }) => {
        return await Avatar.findAll();
    },
    getWatchList: async (parent, args, { WatchList }) => {
        return await WatchList.findAll({
            where: {
                user_id: args.data.user_id,
            },
            order: args.data.sort ? [['id', args.data.sort]] : null,
            limit: args.data.limit ? args.data.limit : null,
            offset: args.data.offset ? args.data.offset : null,
        });
    },
    controlWatchList: async (parent, args, { WatchList }) => {
        return (await WatchList.findOne({
            where: { _id: args.data._id, user_id: args.data.user_id },
        }))
            ? true
            : false;
    },
    search: async (
        parent,
        { imdbId },
        {
            fetch,
            cheerio,
            combineObjects,
            search,
            LANGUAGE_TR,
            POSTER_URL,
            IMDB_API_URL,
            TMDB_API_FIND_URL,
        }
    ) => {
        const datas = [];

        await fetch(IMDB_API_URL.replace('{0}', imdbId))
            .then((response) => response.text())
            .then((body) => {
                const $ = cheerio.load(body);
                var obj = $("script[type='application/ld+json']");
                var data = JSON.parse(obj[0].children[0].data);

                datas.push({
                    type:
                        data['@type'] == 'Movie'
                            ? 'movie'
                            : data['@type'] == 'TVSeries'
                            ? 'series'
                            : data['@type'] == 'CreativeWork'
                            ? 'movie'
                            : null,
                });
            });

        await fetch(
            TMDB_API_FIND_URL.replace('{0}', imdbId).replace('{1}', LANGUAGE_TR)
        )
            .then((response) => response.json())
            .then(async (body) => {
                const type = search('type', datas);
                const movie = body.movie_results[0];
                const series = body.tv_results[0];

                datas.push({
                    title:
                        type == 'movie'
                            ? movie.title
                            : type == 'series'
                            ? series.name
                            : null,
                    poster:
                        type == 'movie'
                            ? POSTER_URL + movie.poster_path
                            : type == 'series'
                            ? POSTER_URL + series.poster_path
                            : null,
                });
            });

        return combineObjects(datas);
    },
    getUpcomings: async (parent, args, { fetch, UPCOMINGS_URL }) => {
        const upcomings = [];

        await fetch(UPCOMINGS_URL)
            .then((response) => response.json())
            .then((body) => {
                upcomings.push(body.upcomings);
            });

        return upcomings[0];
    },
    getKeepWatchingList: async (parent, args, { KeepWatchingList }) => {
        return await KeepWatchingList.findAll({
            where: {
                user_id: args.user_id,
            },
            order: args.sort ? [['id', args.sort]] : null,
            limit: args.limit ? args.limit : null,
            offset: args.offset ? args.offset : null,
        });
    },
};

module.exports = Query;
