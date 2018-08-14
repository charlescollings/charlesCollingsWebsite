const axios = require("axios");
const db = require("../models");

// Defining methods for the nytController

// findAll searches the NYT API and returns only the entries we haven't already saved
module.exports = {
  findAll: function(req, res) {
    const params = Object.assign(
      { api_key: "9b3adf57854f4a19b7b5782cdd6e427a" },
      req.query
    );
    axios
      .get("http://api.sportradar.us/mlb/trial/v6.5/en/games/7781256e-9af7-4c39-a5c9-5fed54e5cf1c/pbp.json?api_key=bspcbjz7p2vffqrdj5ps4ftm")
      
      .then(response => {
        console.log(response.data.game.id)
        const games = {
          _id: response.data.game.id,
          title: "cubs",
          url: "cubs.com"
        };
        db.Article
          .create(games)
          .then(dbArticle => res.json(dbArticle))
          .catch(err => res.status(422).json(err));
        //db.Article
        //  .find()
        //  .then(dbArticles =>
        //    response.data.response.docs.filter(article =>
        //      dbArticles.every(
        //        dbArticle => dbArticle._id.toString() !== article._id
        //      )
        //    )
        //  )
        //  .then(articles => res.json(articles))
        //  .catch(err => res.status(422).json(err));
      });
  }
};
