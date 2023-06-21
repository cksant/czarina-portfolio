let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Game Model
let game = require('../modules/games');

// Get Route for the Game List page
router.get('/',async(req, res, next)=>{
    try {
        let gameList = await game.find();
        // console.log(gameList);
        
        res.render('game', {title:'Game List', GameList: gameList});
    } catch (err){
        console.log(err);
    }
});

module.exports = router;