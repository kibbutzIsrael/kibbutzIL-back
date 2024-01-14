const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController'); 

// GET all volunteers
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

// POST a new volunteer
router.post('/', volunteerController.createVolunteer);

// PUT (update) a volunteer by ID
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
