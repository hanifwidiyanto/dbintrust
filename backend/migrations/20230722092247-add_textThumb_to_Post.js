// migrations/20230722092247-add_textThumb_to_Post.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posts', 'textThumbnail', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('posts', 'textThumbnail');
  },
};

