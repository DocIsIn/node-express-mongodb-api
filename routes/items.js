const express = require('express');
const router = express.Router();
const Item = require('../models/item');

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item (includes asynchronous behavior)
 *     description: Simulates processing delay using setTimeout before saving the item to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully after simulated async delay
 */

router.post('/', async (req, res) => {
  setTimeout(async () => {
    try {
      const item = new Item(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }, 1000); 
});


/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the item
 *         description:
 *           type: string
 *           description: Description of the item
 */
/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created
 */
router.post('/', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).json(item);
});

module.exports = router;
