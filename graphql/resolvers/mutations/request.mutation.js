module.exports = {
    request: async (
        parent,
        { data: { title, user_id } },
        { User, Request, nodemailer, ejs, MAIL_TEMPLATE_REQUEST }
    ) => {
        const user = await User.findByPk(user_id);

        const requestInsert = await Request.create({
            title,
            user_id,
            requested_by: user.dataValues.full_name,
        });

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            tls: { rejectUnauthorized: false },
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        if (requestInsert) {
            ejs.renderFile(
                MAIL_TEMPLATE_REQUEST,
                {
                    title,
                    requested_by: user.dataValues.full_name,
                    user_id_added_by: user_id,
                },
                async function (err, data) {
                    await transporter.sendMail({
                        from: `Diziwon <${process.env.MAIL_USER}>`,
                        to: 'tekiner65@hotmail.com',
                        subject: 'Diziwon Yeni İstek',
                        text: 'Yeni İstek Var',
                        html: data,
                    });

                    if (err) {
                        throw new Error(
                            'Bir hata oluştu lütfen yetkili kişiye bildirin'
                        );
                    }
                }
            );
            return !!requestInsert;
        }
    },
    addMovie: async (
        parent,
        { data: { imdbId, user_id } },
        {
            Data,
            Movie,
            User,
            nodemailer,
            ejs,
            fetch,
            combineObjects,
            API_URL,
            MOVIE_API_URL,
            MAIL_TEMPLATE_ADD_MOVIE,
        }
    ) => {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            tls: { rejectUnauthorized: false },
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const datas = [];

        datas.push({ imdbId });

        await fetch(API_URL.replace('{0}', imdbId))
            .then((response) => response.json())
            .then(async (body) => {
                const type = body.type,
                    title = body.title,
                    original_title = body.original_title,
                    poster = body.poster,
                    backdrop = body.backdrop,
                    backdrop_withtitle = body.backdrop_withtitle,
                    genres = body.genres,
                    summary = body.summary,
                    year = body.year,
                    imdb_rating = body.imdb_rating,
                    maturity = body.maturity,
                    runtime = body.runtime;

                datas.push({
                    type,
                    title,
                    original_title:
                        original_title !== title ? original_title : null,
                    poster,
                    backdrop,
                    backdrop_withtitle,
                    genres: genres.join(),
                    summary,
                    year,
                    imdb_rating,
                    maturity,
                    runtime,
                });
            });

        const data = combineObjects(datas);

        if (data.type != 'movie') {
            throw new Error('IMDb ID ile Sadece Film Ekleyebilirsiniz!');
        }

        const dataGet = await Data.findOne({ where: { imdb_id: imdbId } });

        if (dataGet) {
            throw new Error('Film zaten ekli!');
        }

        await fetch(MOVIE_API_URL.replace('{0}', imdbId))
            .then((response) => response.json())
            .then(async (body) => {
                const link_subtitle = body.link_subtitle,
                    link_dugging = body.link_dugging;

                datas.push({
                    watch: {
                        link_subtitle,
                        link_dugging,
                    },
                });
            });

        const {
            type,
            title,
            original_title,
            poster,
            backdrop,
            backdrop_withtitle,
            genres,
            summary,
            year,
            imdb_rating,
            maturity,
            runtime,
            watch: { link_subtitle, link_dugging },
        } = combineObjects(datas);

        if (!link_subtitle && !link_dugging) {
            throw new Error('İzleme linkleri bulunamadı');
        }

        const dataInsert = await Data.create({
            imdb_id: imdbId,
            type,
            title,
            original_title,
            poster,
            backdrop,
            backdrop_withtitle,
            genres,
            summary,
            year,
            imdb_rating,
            maturity,
            runtime,
            added_by: user_id,
        });

        const user = await User.findByPk(user_id);

        if (dataInsert) {
            const movieInsert = await Movie.create({
                imdb_id: imdbId,
                link_subtitle,
                link_dugging,
            });

            if (movieInsert) {
                ejs.renderFile(
                    MAIL_TEMPLATE_ADD_MOVIE,
                    {
                        poster,
                        title,
                        imdbId,
                        link_subtitle,
                        link_dugging,
                        added_by: user.dataValues.full_name,
                        user_id_added_by: user_id,
                    },
                    async function (err, data) {
                        await transporter.sendMail({
                            from: `Diziwon <${process.env.MAIL_USER}>`,
                            to: 'tekiner65@hotmail.com',
                            subject: 'Diziwon Yeni Film Eklendi',
                            text: 'Yeni Film Eklendi',
                            html: data,
                        });

                        if (err) {
                            throw new Error(
                                'Bir hata oluştu lütfen yetkili kişiye bildirin'
                            );
                        }
                    }
                );
                return !!movieInsert;
            }
        }
    },
    updateMovie: async (
        parent,
        { data: { imdbId } },
        { Movie, fetch, combineObjects, API_URL, MOVIE_API_URL }
    ) => {
        const datas = [];

        datas.push({ imdbId });

        await fetch(API_URL.replace('{0}', imdbId))
            .then((response) => response.json())
            .then(async (body) => {
                const type = body.type;

                datas.push({ type });
            });

        const data = combineObjects(datas);

        if (data.type != 'movie') {
            throw new Error('IMDb ID ile Sadece Film Güncelleyebilirsiniz!');
        }

        await fetch(MOVIE_API_URL.replace('{0}', imdbId))
            .then((response) => response.json())
            .then(async (body) => {
                const link_subtitle = body.link_subtitle,
                    link_dugging = body.link_dugging;

                datas.push({
                    watch: {
                        link_subtitle,
                        link_dugging,
                    },
                });
            });

        const {
            watch: { link_subtitle, link_dugging },
        } = combineObjects(datas);

        if (!link_subtitle && !link_dugging) {
            throw new Error('İzleme linkleri bulunamadı');
        }

        const movieUpdate = await Movie.update(
            {
                link_subtitle,
                link_dugging,
            },
            {
                where: {
                    imdb_id: imdbId,
                },
            }
        );

        return !!movieUpdate;
    },
};
