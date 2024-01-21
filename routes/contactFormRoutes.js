const express = require("express");
const router = express.Router();
const contactFormController = require("../controllers/contactFormController");
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Contacts
 * components:
 *   schemas:
 *     Contact:
 *       required:
 *         - contactName
 *         - contactEmail
 *         - contactMessageBody
 *       properties:
 *         contactName:
 *           type: string
 *         contactEmail:
 *           type: string
 *         contactMessageBody:
 *           type: string
 *       example:
 *         contactName: Volunteer's Name
 *         contactEmail: Volunteer@email.com
 *         contactMessageBody: Hi, Volunteer!
 *
 *     ServerMessage:
 *       required:
 *       properties:
 *         message: string
 *       example:
 *         message: Server message text about failure (or success)
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: GET all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: The list of the contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *          description: The list of the contacts is not found
 *          content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ServerMessage'
 */
router.get("/", contactFormController.getAllContacts);

/**
 * @swagger
 *  /contacts/{id}:
 *   get:
 *     summary: GET the contact by id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *     responses:
 *       200:
 *         description: The contact response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: The contact was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 * 
 *       500:
 *         description: The contact is not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.get("/:id", contactFormController.getContactById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: ADD new contact
 *     tags: [Contacts]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The contact is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: The contact is not created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.post("/", contactFormController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *    summary: PUT (update) a contact by ID
 *    tags: [Contacts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Contact id
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/Contact'
 *    responses:
 *      200:
 *        description: The contact was updated
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *      400:
 *        description: The contact was not found
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *      500:
 *        description: Some error happened
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.put("/:id",authController.protect, authController.resrictTo('admin'), contactFormController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *  delete:
 *     summary: DELETE a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *
 *     responses:
 *       200:
 *         description: The contact was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *       404:
 *         description: The contact was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *       500:
 *         description: The contact is not deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.delete("/:id",authController.protect, authController.resrictTo('admin'), contactFormController.deleteContact);

module.exports = router;
