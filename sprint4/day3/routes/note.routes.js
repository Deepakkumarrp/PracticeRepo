const express = require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middleware/auth.middleware");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const noteRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Note:
 *          type: object
 *          properties:
 *              _id:
 *                  type: ObjectId
 *                  description: The auto-generated id for the note
 *              title:
 *                  type: string
 *                  description: title of the note
 *              body:
 *                  type: string
 *                  description: body of the note
 *              age:
 *                  type: integer
 *                  description: limit
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: This will get all the notes
 *      tags: [Notes]
 *      responses:
 *          200:
 *              description: list of all notes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/Note"
 *          400:
 *              description: Some bad request
 */
noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.send({ mssg: "All notes are here", notes });
  } catch (err) {
    res.send({ err });
  }
});
/**
 * @swagger
 * /users:
 *  post:
 *      summary: This will post a new note
 *      tags: [Notes]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Note"
 *      responses:
 *          200:
 *              description: new note
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/Note"
 *          400:
 *              description: Some bad request
 */

noteRouter.post("/", async (req, res) => {
  try {
    const note = NoteModel(req.body);
    await note.save();
    res.send({ mssg: "New note has been added" });
  } catch (err) {
    res.send({ err });
  }
});

/**
 * @swagger
 * /users/:noteID:
 *  patch:
 *    summary: Update the user details
 *    tags: [Notes]
 *    requestParams:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref : "#/components/schemas/Notes"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref : "#/components/schemas/Notes"
 *    responses:
 *       '200':
 *         description: Registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       '400':
 *         description: Some error occurred
 */

noteRouter.patch("/:noteID", async (req, res) => {
  const { noteID } = req.params;
  try {
    await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
    res.send({ mssg: `The note with ID: ${noteID} has been updated.` });
  } catch (err) {
    res.send({ err });
  }
});
noteRouter.delete("/:noteID", async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });

    await NoteModel.findByIdAndDelete({ _id: noteID }, req.body);
    res.send({ mssg: `The note with ID: ${noteID} has been deleted.` });
  } catch (err) {
    res.send({ err });
  }
});

module.exports = {
  noteRouter,
};
