var express = require('express');
var router = express.Router();
var Livros = require('../controllers/livros');

router.get('/', function(req, res, next) {
    if(req.query.charater){
        Livros.findByCharater(req.query.charater)
            .then(data => {
                res.jsonp(data)
            })
            .catch(erro => {
                res.jsonp(erro)
            })
    } else if (req.query.genre) {
        Livros.findByGenres(req.query.genre)
            .then(data => {
                res.jsonp(data)
            })
            .catch(erro => {
                res.jsonp(erro)
            })
    } else if (req.query.author) {
        Livros.findByAuthor(req.query.author)
            .then(data => {
                res.jsonp(data)
            })
            .catch(erro => {
                res.jsonp(erro)
            })
    } else{
        Livros.list()
            .then(data => {
                res.jsonp(data)
            })
            .catch(erro => {
                res.jsonp(erro)
            })
    }
});

router.get('/genres', function(req, res, next) {
    Livros.listGenres()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.get('/characters', function(req, res, next) {
    Livros.listCharaters()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});


router.get('/:id', function(req, res, next) {
    Livros.findById(req.params.id)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.post('/', function(req, res, next) {
    Livros.insert(req.body)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.delete('/:id', function(req, res, next) {
    Livros.remove(req.params.id)
    .then(data => {
        res.jsonp(data)
        console.log("Deleted " + req.params.id)
    })
    .catch(erro => {
        res.jsonp(erro)
    })
});

router.put('/:id', function(req, res, next) {
    Livros.update(req.params.id, req.body)
    .then(data => {
        res.jsonp(data)
    })
    .catch(erro => {
        res.jsonp(erro)
    })
});

module.exports = router;