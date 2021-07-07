'use strict';
const express = require('express');
const clothesRouter = express.Router();
const clothesModel = require('../models/clothes');
const Collection = require('../models/data-collection-class');
const Interface = require('../models/sql_interface');
const clothes = new Interface(clothesModel);

clothesRouter.get('/', getclothes);
clothesRouter.get('/:id', getclothes);
clothesRouter.post('/', createclothes);
clothesRouter.put('/:id', updateclothes);
clothesRouter.delete('/:id', deleteclothes);

async function getclothes(req, res, next) {
  try {
    const id = req.params.id;
    const clothes = await clothes.read(id);
    res.json({ clothes:clothes.rows });
  } catch (e) {
    next(e);
  }
}

async function createclothes(req, res, next) {
  try {
    const data = req.body;
    const newclothes = await clothes.create(data);
    res.json(newclothes.rows[0]);
  } catch (e) {
    next(e);
  }
}
async function updateclothes(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const newclothes = await clothes.update(id, data);
    res.json(newclothes.rows[0]);
  } catch (e) {
    next(e);
  }
}
async function deleteclothes(req, res, next) {
  try {
    const id = req.params.id;
    const deletedclothes = await clothes.delete(id);
    res.json('deleted clothes',deletedclothes.rows[0]);
  } catch (e) {
    next(e);
  }
}
module.exports = clothesRouter;