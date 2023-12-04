const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const notEmptyTitleAndContent = (req, res, next) => {
    const { title, content } = req.body;
    const errors = [];

    if (title && !title.trim().length ) {
        errors.push("Title should not contain only whitespace.");
    }
    if (content && !content.trim().length) {
        errors.push("Content should not contain only whitespace.");
    }

    if (!errors.length) return next();

    const err = new Error("Invalid Value.");
    err.title = "Invalid Value";
    err.errors = errors;
    err.status = 400;
    next(err);
};

const validateNote = [
    notEmptyTitleAndContent,
    check("title")
      .exists({ checkFalsy: true })
      .isLength({ min: 1, max: 100 })
      .withMessage("Title must be 1-100 characters."),
    check("content")
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage("Content can't be empty."),
    handleValidationErrors
];

const router = express.Router();

router.use(requireAuth);

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const user = req.user;
        const notes = await Note.findAll({
            where: { userId: user.id },
            order: [["createdAt", "DESC"]]
        });
        return res.json(notes)
    })
);

router.post(
    '/',
    validateNote,
    asyncHandler(async (req, res) => {
        const { id } = req.user;
        const { title, content } = req.body;
        const newNote = await Note.create({ title, content, userId: id });
        return res.json(newNote);
    })
);

router.put(
    '/:id',
    validateNote,
    asyncHandler(async (req, res, next) => {
        const noteId = parseInt(req.params.id, 10);
        const { title, content } = req.body;

        try {
            const [updatedRowCount] = await Note.update({ title, content }, {
                where: { id: noteId }
            });

            if (updatedRowCount > 0) {
                const updatedNote = await Note.findByPk(noteId);
                return res.json(updatedNote);
            } else {
                const err = new Error(`Note with ID ${noteId} not found or no changes made.`);
                err.title = "Update Failed!"
                err.errors = [`Note with ID ${noteId} not found or no changes made.`]
                err.status = 404;
                throw err;
            }
        } catch(err) {
            next(err)
        }
    })
);

router.delete(
    '/:id',
    asyncHandler(async (req, res, next) => {
        const noteId = parseInt(req.params.id, 10);

        try {
            const deletedRowsCount = await Note.destroy({
                where: { id: noteId }
            });

            if (deletedRowsCount  > 0) {
                return res.json({ message: `Note deleted successfully!`, noteId });
            } else {
                const err = new Error(`Failed to delete note with ID ${noteId}`);
                err.title = "Deletion Failed!"
                err.errors = [`Failed to delete note with ID ${noteId}`]
                err.status = 404;
                throw err;
            }
        } catch(err) {
            next(err)
        }
    })
);

module.exports = router;
