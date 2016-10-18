const Sequelize = require('sequelize');
const User = require('../models/user');
const Project = require('../models/project');

var fn_default = async (ctx, next) => {
     let n = ctx.session.views || 0
        ctx.session.views = ++n;
    console.log(n);
};

var fn_index = async (ctx, next) => {
    const projects = await Project.findAll({
      include: [{
        model: User,
        where: { id: Sequelize.col('projects.userId') }
      }]
    });
    const resProject = projects.map(item => {
      const data = item.dataValues;
      const user = data.user.dataValues;
      const project = {
        id: data.id,
        time: data.time,
        title: data.title,
        desc: data.desc,
        image: data.image,
        user: {
          id: user.id,
          name: user.name,
          avatar: user.name.avatar
        }
      };
      return project;
    });
    const data = {
      projects: resProject
    };
    ctx.response.header['Content-Type'] = 'application/json';
    ctx.response.body = JSON.stringify(data);
};

module.exports = {
    'GET /': fn_default,
    'GET /api/projects': fn_index
};