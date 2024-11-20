const FilmModel = require('../models/filmsModel');
const convertToMp4 = require('./videoService');
const generateInviteLink = require('./linksService');

/**
 * Creates a film record and generates an invite link.
 * @param {Object} filmData - The data to insert into the film table.
 * @returns {Object} - The created film record with the invite link.
 */


const createFilm = async (filmData) => {
  try {
    // Create film record without the invite link
    const film = await FilmModel.create({
      title: filmData.title,
      description: filmData.description,
      filePath: filmData.filePath,
      convertedFilePath: filmData.convertedFilePath,
      releaseDate: new Date(filmData.releaseDate),
    });

    // Generate the invite link
    film.inviteLink = generateInviteLink(film.id);
    await film.save();

    return film;
  } catch (error) {
    console.error('Error in Film Service:', error);
    throw error; // Let the router handle the error
  }
};

module.exports = { createFilm };
