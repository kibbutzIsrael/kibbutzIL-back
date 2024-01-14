const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController'); 

/**
 * @swagger
 * tags:
 *   name: Volunteers
 * components:
 *   schemas:
 *     Volunteer:
 *       properties:
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         location:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         gender:
 *           type: string
 *         positionUntilNow:
 *           type: string
 *         fecerPosition:
 *           type: string
 *         yearExperience:
 *           type: string
 *         PDF:
 *           type: string
 *       example:
 *         fullName: Volunteer Volunteer
 *         email: volunteer@email.com
 *         location: Center
 *         phoneNumber: 0485858855
 *         gender: male
 *         positionUntilNow: Position name
 *         fecerPosition: Position name
 *         yearExperience: 10
 *         PDF: link-to-the-bucket.com
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
 * /volunteers:
 *   get:
 *     summary: GET all volunteers
 *     tags: [Volunteers]
 *     responses:
 *       200:
 *         description: The list of the volunteers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Volunteer'
 *       500:
 *          description: The list of the volunteers is not found
 *          content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ServerMessage'
 */
router.get('/', volunteerController.getAllVolunteers);

/**
 * @swagger
 *  /volunteers/{id}:
 *   get:
 *     summary: GET a volunteer by ID
 *     tags: [Volunteers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *     responses:
 *       200:
 *         description: The volunteer response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Volunteer'
 *       404:
 *         description: The voluteer was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 * 
 *       500:
 *         description: The voluteer is not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.get('/:id', volunteerController.getVolunteerById);

/**
 * @swagger
 * /volunteers:
 *   post:
 *     summary: POST a new volunteer
 *     tags: [Volunteers]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/Volunteer'
 *     responses:
 *       201:
 *         description: The volunteer is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Volunteer'
 *       400:
 *         description: The volunteer is not created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */ 
router.post('/', volunteerController.createVolunteer);

/**
 * @swagger
 * /volunteers/{id}:
 *   put:
 *    summary: PUT (update) a volunteer by ID
 *    tags: [Volunteers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The volunteer id
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/Volunteer'
 *    responses:
 *      200:
 *        description: The volunteer was updated
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Volunteer'
 *      400:
 *        description: The volunteer was not found
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
router.put('/:id', volunteerController.updateVolunteer);

/**
 * @swagger
 * /volunteers/{id}:
 *  delete:
 *     summary: DELETE a volunteer by ID
 *     tags: [Volunteers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The volunteer id
 *
 *     responses:
 *       200:
 *         description: The volunteer was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *       404:
 *         description: The volunteer was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *       500:
 *         description: The volunteer is not deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */ 
router.delete('/:id', volunteerController.deleteVolunteer);

module.exports = router;
