const express = require("express");
const router = express.Router();
const mailingListController = require("../controllers/mailingListController");
const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Mailing
 * components:
 *   schemas:
 *     MailingList:
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *       example:
 *         email: volunteer@email.com
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
 * /mailingList:
 *   get:
 *     summary: GET all mails
 *     tags: [Mailing]
 *     responses:
 *       200:
 *         description: The list of the mails
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MailingList'
 *       500:
 *          description: The list of the emails is not found
 *          content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ServerMessage'
 */
router.get("/",authController.protect , mailingListController.getAllMails);
router.get("/getlistmails",authController.protect , mailingListController.getListMails);

router.get("/:id",authController.protect , mailingListController.getMailById);


router.get("/bymail/:email",authController.protect , mailingListController.getListEmailByMail);

router.post("/", mailingListController.addMail);

router.put(
  "/:id",
  authController.protect,
  authController.resrictTo("admin"),
  mailingListController.updateMail
);

router.delete(
  "/:id",
  authController.protect,
  authController.resrictTo("admin"),
  mailingListController.deleteMail
);

module.exports = router;
