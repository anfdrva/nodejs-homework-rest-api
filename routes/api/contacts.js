const express = require('express')

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { validationContact } = require("../../schemas");

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.get("", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.post("", validateBody(validationContact), ctrl.addContact);

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.delete("/:contactId", ctrl.removeContact);

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.put("/:contactId", validateBody(validationContact), ctrl.updateContact);

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router;
