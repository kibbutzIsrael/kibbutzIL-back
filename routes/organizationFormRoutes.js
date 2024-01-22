const express = require('express');
const router = express.Router();
const organizationFormController = require('../controllers/organizationFormController'); 
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Organizations
 * components:
 *   schemas:
 *     Organization:
 *       required:
 *         - organizationName
 *         - organizationPhoneNumber
 *         - organizationContactName
 *         - organizationEmail
 *         - organizationMessageBody
 *         - organizationType
 *       properties:
 *         organizationName:
 *           type: string
 *         organizationPhoneNumber:
 *           type: string
 *         organizationContactName:
 *           type: string
 *         organizationEmail:
 *           type: string
 *         organizationMessageBody:
 *           type: string
 *         organizationType:
 *           type: string
 *       example:
 *         organizationName: Super-name
 *         organizationPhoneNumber: 05890847634
 *         organizationContactName: Name Surname
 *         organizationEmail: organization@email.com
 *         organizationMessageBody: Hi, organization!
 *         organizationType: medium
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
 * /organizations:
 *   get:
 *     summary: GET all organizations
 *     tags: [Organizations]
 *     responses:
 *       200:
 *         description: The list of the organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 *       500:
 *          description: The list of the organizations is not found
 *          content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ServerMessage'
 */
router.get('/', organizationFormController.getAllOrganizations);

/**
 * @swagger
 *  /organizations/{id}:
 *   get:
 *     summary: GET an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization id
 *     responses:
 *       200:
 *         description: The organization response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: The organization was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 * 
 *       500:
 *         description: The organization is not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.get('/:id', organizationFormController.getOrganizationById);

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: POST a new organization
 *     tags: [Organizations]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/Organization'
 *     responses:
 *       201:
 *         description: The organization is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: The organization is not created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.post('/', organizationFormController.createOrganization);

/**
 * @swagger
 * /organizations/{id}:
 *   put:
 *    summary: PUT (update) an organization by ID
 *    tags: [Organizations]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The organization id
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/Organization'
 *    responses:
 *      200:
 *        description: The organization was updated
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *      400:
 *        description: The organization was not found
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
router.put('/:id',authController.protect, authController.resrictTo('admin'), organizationFormController.updateOrganization);

/**
 * @swagger
 * /organizations/{id}:
 *  delete:
 *     summary: DELETE an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization id
 *
 *     responses:
 *       200:
 *         description: The organization was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *       404:
 *         description: The organization was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *       500:
 *         description: The organization is not deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
// 
router.delete('/:id',authController.protect, authController.resrictTo('admin'), organizationFormController.deleteOrganization);

module.exports = router;
