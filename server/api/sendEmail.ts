import { promises as fs } from 'fs';
import { defineEventHandler, readBody } from 'h3';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    const transfer = await readBody(event);  // Récupère le corps de la requête

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

    // Envoi de l'email de confirmation
    try {
        await sendConfirmationEmail(transfer);
        return { success: true, message: 'Virement enregistré et email envoyé avec succès.' };
    } catch (error) {
        return { success: false, message: 'Virement enregistré, mais erreur lors de l\'envoi de l\'email.' };
    }
});

// Fonction pour envoyer l'email de confirmation
async function sendConfirmationEmail(transfer) {
    // Créer un transporteur SMTP pour envoyer l'email
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',  // Remplace par le serveur SMTP que tu utilises
        port: 587,  // Utilise le port correct (587 ou 465 selon le serveur SMTP)
        secure: false,  // true pour les connexions SSL/TLS, false pour STARTTLS
        auth: {
            user: 'donquidofi612@gmail.com',  // Ton email d'envoi
            pass: 'ojbeukobjpadsjcq',  // Ton mot de passe email
        },
    });

    // Détails de l'email
    const mailOptions = {
        from: '"Virement Confirmé" <your-email@example.com>',  // L'email d'envoi
        to: transfer.email,  // L'adresse email du bénéficiaire
        subject: 'Confirmation de Virement',
        text: `Bonjour ${transfer.beneficiary},\n\nVotre virement de ${transfer.amount} EUR a bien été enregistré.\n\nDétails :\n- IBAN : ${transfer.iban}\n- Montant : ${transfer.amount} EUR\n- Date d'exécution : ${transfer.executionDate}\n\nMerci de votre confiance.\n\nCordialement,`,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
}
