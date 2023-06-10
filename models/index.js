const User = require('./User')
const BlogPost = require('./BlogPost')
const Comment = require('./Comment')

// set up associations
// cascade delete in all cases.
BlogPost.hasMany(Comment, {
  onDelete: 'CASCADE',
  foreignKey: 'blogpost_id'
})

Comment.belongsTo(BlogPost, {
  foreignKey: 'blogpost_id'
})

User.hasMany(BlogPost, {
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
})

BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
})

User.hasMany(Comment, {
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, BlogPost, Comment }
