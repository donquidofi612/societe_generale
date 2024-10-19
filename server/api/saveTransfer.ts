import { promises as fs } from 'fs';
import { defineEventHandler, readBody } from 'h3';

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

    return { success: true, message: 'Virement enregistré avec succès.' };
});
