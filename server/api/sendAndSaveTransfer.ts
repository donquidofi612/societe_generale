import { promises as fs } from 'fs';
import { defineEventHandler, readBody } from 'h3';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);  // Récupère les données

    const transfer = body.transfer;

    // Lire le fichier JSON existant ou créer une liste vide
    let transfers = [];
    try {
        const data = await fs.readFile('virements.json', 'utf-8');
        transfers = JSON.parse(data);
    } catch (error) {
        transfers = [];
    }

    // Ajouter le nouveau virement à la liste
    transfers.push(transfer);

    // Enregistrer la liste mise à jour dans le fichier
    await fs.writeFile('virements.json', JSON.stringify(transfers, null, 2), 'utf-8');

    // Envoyer l'email
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',  // Remplace par le serveur SMTP que tu utilises
            port: 587,  // Utilise le port correct (587 ou 465 selon le serveur SMTP)
            secure: false,  // true pour les connexions SSL/TLS, false pour STARTTLS
            auth: {
                user: 'donquidofi612@gmail.com',  // Ton email d'envoi
                pass: 'ojbeukobjpadsjcq',  // Ton mot de passe email
            },
        });

        const mailOptions = {
            from: '"Virement Confirmé" <your-email@example.com>',
            to: body.email,
            subject: body.subject,
            text: body.message,
        };

        await transporter.sendMail(mailOptions);

        return { success: true, message: 'Virement enregistré et email envoyé avec succès.' };
    } catch (error) {
        return { success: false, message: 'Erreur lors de l\'envoi de l\'email.' };
    }
});
