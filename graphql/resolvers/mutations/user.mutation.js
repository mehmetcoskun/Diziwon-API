module.exports = {
    login: async (
        parent,
        {
            data: {
                email,
                password,
                device_brand,
                device_model,
                device_os_version,
                app_version,
            },
        },
        { User, bcrypt, jwt }
    ) => {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("E-posta adresi hatalı");
        }

        const validPassword = await bcrypt.compare(
            password,
            user.dataValues.password
        );
        if (!validPassword) {
            throw new Error("Şifreniz Hatalı");
        }

        if (user.dataValues.status == "inactive") {
            throw new Error("Hesabınız Devre Dışı Bırakılmış");
        } else if (user.dataValues.status == "pending") {
            throw new Error("Hesabınız Doğrulama Bekliyor...");
        }

        await User.update(
            {
                device_brand: device_brand && device_brand,
                device_model: device_model && device_model,
                device_os_version: device_os_version && device_os_version,
                app_version: app_version && app_version,
            },
            {
                where: {
                    id: user.dataValues.id,
                },
            }
        );

        return {
            token: jwt.sign(
                { id: user.dataValues.id },
                process.env.JWT_SECRET_KEY
            ),
        };
    },
    register: async (
        parent,
        {
            data: {
                avatar,
                full_name,
                email,
                password,
                last_active,
                device_brand,
                device_model,
                device_os_version,
                app_version,
            },
        },
        {
            Settings,
            User,
            nodemailer,
            ejs,
            emailvalidator,
            bcrypt,
            MAIL_TEMPLATE_ACCOUNT_VERIFY,
        }
    ) => {
        if (!emailvalidator.validate(email)) {
            throw new Error("Lütfen geçerli bir E-Posta adresi girin");
        }

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            if (existingUser.dataValues.status == 'pending') {
                throw new Error("Hesabınız onaylanmamış, E-posta adresinizi kontrol edin!");
            } else {
                throw new Error("E-posta adresi zaten kullanılmaktadır");
            }
        }

        const hash = await bcrypt.hash(password, 10);

        const settings = await Settings.findOne();

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

        await User.create({
            avatar,
            full_name,
            email,
            password: hash,
            status: "pending",
            last_active,
            device_brand: device_brand && device_brand,
            device_model: device_model && device_model,
            device_os_version: device_os_version && device_os_version,
            app_version: app_version && app_version,
        }).then(() => {
            ejs.renderFile(
                MAIL_TEMPLATE_ACCOUNT_VERIFY,
                {
                    uri:
                        settings.dataValues.root_path +
                        "/account_verify.php?q=" +
                        new Buffer.from(email).toString("base64"),
                    full_name,
                    assets_url: settings.dataValues.assets_url,
                },
                async function (err, data) {
                    await transporter.sendMail({
                        from: `Diziwon <${process.env.MAIL_USER}>`,
                        to: email,
                        subject: "Diziwon Hesap Doğrulama",
                        text: "Diziwon Hesabınızı Doğrulayın",
                        html: data,
                    });

                    if (err) {
                        throw new Error(
                            "Bir hata oluştu lütfen yetkili kişiye bildirin"
                        );
                    }
                }
            );
        });

        const user = await User.findOne({ where: { email } });

        return !!user;
    },
    updateUser: async (
        parent,
        {
            data: {
                id,
                avatar,
                full_name,
                last_active,
                device_brand,
                device_model,
                device_os_version,
                app_version,
            },
        },
        { User }
    ) => {
        await User.update(
            {
                avatar: avatar && avatar,
                full_name: full_name && full_name,
                last_active: last_active && last_active,
                device_brand: device_brand && device_brand,
                device_model: device_model && device_model,
                device_os_version: device_os_version && device_os_version,
                app_version: app_version && app_version,
            },
            {
                where: {
                    id,
                },
            }
        );

        return await User.findOne({ where: { id } });
    },
    setUserStatus: async (parent, args, { User }) => {
        const status = await User.update(
            {
                status: args.status,
            },
            {
                where: {
                    id: args.id,
                },
            }
        );

        return !!status;
    },
    deleteUser: async (parent, args, { User, WatchList }) => {
        const user = await User.findOne({ where: { id: args.id } });
        
        WatchList.destroy({ where: { user_id: args.id } });

        return !!user.destroy();
    },
};
