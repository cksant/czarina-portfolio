let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Game Model
let game = require('../models/games');
const req = require('express/lib/request');

// Get Route for the Game List page - READ Operation
router.get('/',async(req, res, next)=>{
    try {
        let gameList = await game.find();
        console.log(gameList);
        
        res.render('game/list', {title:'Games', GameList: gameList});
    } catch (err){
        console.log(err);
    }
});

// Get Route for the Add Page - CREATE Operation
 router.get('/add',async(req, res, next)=>{
    try {
        let gameList = await game.find();
        console.log(gameList);
        
        res.render('game/add', {title:'Add Games'});
    } catch (err){
        console.log(err);
    }
});

// Post Route for procesing the Add page - CREATE Operation
router.post('/add', async(req, res, next) => {
    let newGame = new Game({
        'name': req.body.name,
        'developer': req.body.developer,
        'released': req.body.released,
        'description': req.body.description,
        'price': req.body.price
    });

    try {
        await newGame.save();
        res.redirect('/game-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// Get Route for displaying the Edit page - UPDATE Operation
router.get('/edit/:id', async(req, res, next) => {
    let id = req.params.id;

    try {
        let gameToEdit = await Game.findById(id);
        res.render('game/edit', {title: 'Edit Game', game: gameToEdit})
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Post Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id', async(req, res, next) => {
    let id = req.params.id;

    let updatedGame = {
        'name': req.body.name,
        'developer': req.body.developer,
        'released': req.body.released,
        'description': req.body.description,
        'price': req.body.price
    }

    try {
        await Game.updateOne({_id:id}, updatedGame);
        res.redirect('/game-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// Get to perform Deletion - Delete Operation
router.get('/delete/:id', async(req, res, next) => {
    let id = req.params.id;

    try {
        await Game.findByIdAndRemove(id);
        res.redirect('/game-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;