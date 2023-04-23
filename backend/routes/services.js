const express = require('express');
const router = express.Router();

const org = process.env.ORG;

// importing data model schemas
const { services } = require('../models/models');

// GET org services
router.get('/', (req, res, next) => {
  services.find({ orgs: org }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// POST new service
router.post('/', (req, res, next) => {
  const newService = req.body;
  newService.orgs = [org];
  services.create(newService, (error, data) => {
    if (error) {
      if (error.code === 11000) {
        // catch duplicate key error
        return res.status(400).send('Duplicate service ID');
      }
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// PUT update client
router.put('/update/:id', (req, res, next) => {
  services.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// PUT add existing client to org
router.put('/register/:id', (req, res, next) => {
  services.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { orgs: org } },
    { new: true },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// hard DELETE client by ID, as per project specifications
router.delete('/:id', (req, res, next) => {
  services.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Service not found');
    } else {
      res.send('Service deleted');
    }
  });
});

module.exports = router;
