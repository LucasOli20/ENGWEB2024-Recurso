var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
    axios.get("http://api:17000/books")
    .then(resp => {
        livros = resp.data
        res.status(200).render("listaLivros", {"lLivros" : livros})
    })
    .catch(erro => {
        res.status(500).render("error", {"error" : erro})
    })
});

router.get('/authors/:idAutor', function(req, res, next) {
    axios.get("http://api:17000/books?author=" + req.params.idAutor)
    .then(resp => {
        autor = resp.data
        res.status(200).render("paginaAutor", {"Autor" : autor})
    })
    .catch(erro => {
        res.status(500).render("error", {"error" : erro})
    })
});

router.get('/:id', function(req, res, next) {
    axios.get("http://api:17000/books/" + req.params.id)
    .then(resp => {
        livro = resp.data
        res.status(200).render("paginaLivro", {"Livro" : livro})
    })
    .catch(erro => {
        res.status(502).render("error", {"error" : erro})
    })
});

module.exports = router;
