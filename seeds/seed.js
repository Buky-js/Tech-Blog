const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userdata = require('./userData.json');
const blogdata = require('./blogData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userdata, {
        individualHooks: true,
        returning: true
    });

    for (const blog of blogdata) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id
        });
    }

    process.exit(0);
};

seedDatabase();

