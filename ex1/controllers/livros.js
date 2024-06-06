var mongoose = require("mongoose")

var Livros = require("../models/livros");

module.exports.list = () => {
    return Livros
        .find()
        .sort({_id:1})
        .exec()
}

module.exports.findById = id => {
    return Livros
        .findOne({_id : id})
        .exec()
}

module.exports.insert = (livro) => {
    if((Livros.find({_id : livro._id}).exec()).length != 1){
        var newLivro = new Livros(livro)
        return newLivro.save()
    }
}

module.exports.remove = (id) => {
    return Livros
        .findByIdAndDelete(id)
        .exec()
}

module.exports.update = (id, livro) => {
    return Livros
    .findByIdAndUpdate(id,livro, {new:true})
    .exec()
}

module.exports.findByCharater = charater => {
    return Livros
        .find({characters : charater})
        .sort({_id:1})
        .exec()
}

module.exports.findByGenres = genre => {
    return Livros
        .find({genres : genre})
        .sort({_id:1})
        .exec()
}

module.exports.findByAuthor = idAuthor => {
    return Livros
        .find({author : idAuthor})
        .sort({_id:1})
        .exec()
}

module.exports.listGenres = () => {
    return Livros
    .aggregate([
        { $unwind: "$genres" },
        { $group: { _id: "$genres" } },
        { $sort: { _id: 1 } },
        {$project: {_id:0, genre: "$_id"}},
        {$group: {_id:null, genres: {$push: "$genre"}}}
    ])
    .exec()
    .then(result => {
        return result.length > 0 ? result[0].genres : [];
    });
}

module.exports.listCharaters = () => {
    return Livros
    .aggregate([
        { $unwind: "$characters" },
        { $group: { _id: "$characters" } },
        { $sort: { _id: 1 } },
        {$project: {_id:0, character: "$_id"}},
        {$group: {_id:null, characters: {$push: "$character"}}}
    ])
    .exec()
    .then(result => {
        return result.length > 0 ? result[0].characters : [];
    });
}