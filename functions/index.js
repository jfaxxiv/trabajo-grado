/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "juanfelipearciniegas21@gmail.com", // Tu correo electrónico
        pass: "ydoe ayep tuyj engj"        // Tu contraseña 
    }
});

// Función de Firebase para enviar correo
exports.sendEmail = functions.https.onRequest((req, res) => {
    const mailOptions = {
        from: "juanfelipearciniegas21@gmail.com", // Correo remitente
        to: req.body.email,          // Correo destinatario
        subject: "Ganador",
        text: "Felicidades Ganaste!!" 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        return res.status(200).send("Correo enviado: " + info.response);
    });
});