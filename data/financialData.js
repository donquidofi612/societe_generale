// src/data/bankData.js

// Solde du compte courant ajouté
export const checkingAccountBalance = 5000; // Exemple de solde compte courant
export const logoUrl = "https://particuliers.sg.fr/static/Resources/img/logo/logo-sg-seul.svg"; // Exemple de solde compte courant

// Solde du prêt ajouté
export const loanBalance = 100000; // Exemple de solde de prêt

export const accountBalance = "1 475 000,00"; // Solde du compte
export const currency = "EUR"; // Solde du compte
export const targetProgress = 48; // Progression en %

export const creditCardBalance = -2500.00; // Exemple de solde carte de crédit
export const creditCardLimit = 5000.00; // Limite carte de crédit

export const savingsBalance = 1210000; // Solde épargne
export const savingsGrowth = 5.2; // Croissance épargne en pourcentage

export const fullname = "Gerard Boucle";

// Transactions récentes mises à jour
export const recentTransactions = [
    { date: '2023-10-05', description: 'Supermarché Carrefour', amount: -150.30, type: 'Débit' },
    { date: '2023-10-04', description: 'Virement reçu', amount: 1200.00, type: 'Crédit' },
    { date: '2023-10-03', description: 'Paiement en ligne Amazon', amount: -89.99, type: 'Débit' },
    { date: '2023-10-01', description: 'Salaire', amount: 2500.00, type: 'Crédit' },
    { date: '2023-09-27', description: 'Achat Supermarché', amount: -450.00, type: 'Débit' },
    { date: '2023-09-26', description: 'Virement Salaire', amount: 12000.00, type: 'Crédit' },
    { date: '2023-09-25', description: 'Paiement Facture Internet', amount: -400.00, type: 'Débit' },
    { date: '2023-09-24', description: 'Retrait DAB', amount: -2000.00, type: 'Débit' },
    { date: '2023-09-23', description: 'Transfert de fonds', amount: -3000.00, type: 'Débit' },
];

export const spendingData = {
    labels: ['Alimentation', 'Transport', 'Loisirs', 'Factures', 'Autres'],
    datasets: [{
        data: [500, 200, 300, 400, 150],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
};

// Options pour le cercle de progression
export const progressOptions = {
    chart: {
        type: 'radialBar',
        height: 120,
        width: 120,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: {
                margin: 0,
                size: "60%",
                background: "transparent"
            },
            track: {
                background: "#fff",
                strokeWidth: '97%',
                margin: 5,
                dropShadow: {
                    enabled: false,
                }
            },
            dataLabels: {
                show: true,
                value: {
                    formatter: function (val) {
                        return val + "%";
                    },
                    color: "#fff",
                    fontSize: "16px",
                    show: true,
                }
            }
        }
    },
    fill: {
        type: 'solid',
        colors: ['#ffffff']
    },
    stroke: {
        lineCap: 'round'
    },
    labels: ['Progress'],
    colors: ['#fff'],
};

export const progressSeries = [targetProgress]; // La progression en %

export const balanceOptions = {
    chart: {
        type: 'line',
        toolbar: {
            show: false
        },
        height: 200,
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct']
    },
    colors: ['#4BC0C0'],
};

export const balanceSeries = [{
    name: 'Solde',
    data: [10000, 12000, 9000, 11000, 13000, 12500, 14000, 13500, 15000, 12500]
}];

export const incomeExpenseOptions = {
    chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
            show: false
        },
        height: 200,
    },
    xaxis: {
        categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct']
    },
    colors: ['#28a745', '#dc3545'],
};

export const incomeExpenseSeries = [{
    name: 'Revenus',
    data: [2500, 2600, 2400, 2550, 2700, 2650, 2800, 2750, 2900, 2850]
}, {
    name: 'Dépenses',
    data: [2000, 1800, 2100, 1900, 2200, 2000, 2300, 2150, 2400, 2250]
}];

export const financialGoals = [
    { goal: 'Épargner pour les vacances', progress: 60 },
    { goal: 'Achat d\'une nouvelle voiture', progress: 35 },
    { goal: 'Constitution d\'un fonds d\'urgence', progress: 80 },
];

export const latestNews = [
    { title: 'Mise à jour des taux d\'intérêt', date: '2023-10-05' },
    { title: 'Nouveaux services bancaires mobiles', date: '2023-10-03' },
    { title: 'Conseils pour économiser', date: '2023-10-01' },
];

export const recentActivities = [
    {
        icon: 'bi bi-circle-fill fs-8',
        iconBg: 'bg-primary-transparent',
        description: 'Connexion depuis un nouvel appareil',
        time: 'Il y a 2 heures'
    },
    {
        icon: 'bi bi-circle-fill fs-8',
        iconBg: 'bg-success-transparent',
        description: 'Mise à jour de votre profil',
        time: 'Hier'
    },
    {
        icon: 'bi bi-circle-fill fs-8',
        iconBg: 'bg-warning-transparent',
        description: 'Alerte de sécurité',
        time: 'Il y a 3 jours'
    },
];
