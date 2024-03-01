var express = require('express');
var router = express.Router();
const tasks = require('../services/tasks')

/* GET tasks listing. */
router.get('/', function(req, res, next) {
  try {
    const {page, id} = req.query;

    if (id) {
      res.json(tasks.getTaskById(id));
    } else {
      res.json(tasks.getMultiple(page));
    }

    
  } catch(err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

router.put('/:id', function(req, res, next) {
  try {
    const {id, title, description, isCompleted} = req.body

    console.log('esto es params', req.params);
    console.log('esto es body', req.body);

    try {
      tasks.updateTask(id, title, description, isCompleted);
    } catch (error) {
      console.error(error);
      next(err);
    }

    res.json({success: true})
  } catch (error) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

router.delete('/:id', function(req, res, next) {
  try {
    const {id} = req.params

    console.log('esto es params', req.params);

    try {
      tasks.deleteTask(id);
    } catch (error) {
      console.error(error);
      next(err);
    }

    res.json({success: true})
  } catch (error) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

router.post('/', function(req, res, next) {
  try {
    const {title, description, isCompleted} = req.body

    console.log('esto es body', req.body);

    try {
      tasks.addTask(title, description, isCompleted);
    } catch (error) {
      console.error(error);
      next(err);
    }

    res.json({success: true})
  } catch (error) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
