const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {}

Comment.init({
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
    },
    id: {
        type:  DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
   
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    }
    
}, 

{
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'comment'
})


module.exports = Comment;