const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const notesRouter = require('./notes');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notes', notesRouter);

module.exports = router;
