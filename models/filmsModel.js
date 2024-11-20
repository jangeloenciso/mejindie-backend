const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ensure you're correctly importing your sequelize instance

const FilmModel = sequelize.define('films', {
    title: {
        type: DataTypes.STRING, // Title of the film
        allowNull: false, // Title cannot be null
        validate: {
            len: [3, 100] // Validate length of title (between 3 to 100 characters)
        }
    },
    description: {
        type: DataTypes.STRING, // Description of the film
        allowNull: true, // Description is optional
        validate: {
            len: [0, 500] // Optional, max length of 500 characters
        }
    },
    filePath: {
        type: DataTypes.STRING, // Path to the uploaded film file
        allowNull: false, // Path cannot be null
    },
    convertedFilePath: {
        type: DataTypes.STRING, // Path to the converted MP4 file
        allowNull: true, // Converted file is optional for now
    },
    releaseDate: {
        type: DataTypes.DATE, // Release date for the film
        allowNull: false, // Release date cannot be null
    },
    inviteLink: {
        type: DataTypes.STRING, // Unique invite link for accessing the film
        allowNull: true, // Invite link cannot be null
        unique: true, // Each film should have a unique invite link
    },
}, {
    timestamps: true, // Automatically create createdAt and updatedAt fields
});

// Sync the model with the database (this creates the table if it doesn't exist)
FilmModel.sync()
    .then(() => console.log('Films table created successfully'))
    .catch((error) => console.error('Error creating films table: ', error));

module.exports = FilmModel;
