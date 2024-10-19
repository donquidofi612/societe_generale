import { promises as fs } from 'fs';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
    try {
        // Lire le fichier virements.json et retourner son contenu
        const data = await fs.readFile('virements.json', 'utf-8');

        // Convertir les données en JSON
        const transfers = JSON.parse(data);

        // Retourner la liste des virements
        return transfers;
    } catch (error) {
        // Si le fichier n'existe pas encore ou qu'il y a une erreur, retourner une liste vide
        return [];
    }
});
