const express = require('express');
const router = express.Router();
const { all, add, remove, edit, employee } = require('../controllers/employees');
const { auth } = require('../middleware/auth');

router.get("/", auth, all);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);
router.get("/:id", auth, employee);

module.exports = router;