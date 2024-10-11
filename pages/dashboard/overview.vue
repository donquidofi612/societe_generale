<script setup lang="ts">
import { ref } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import ApexCharts from 'vue3-apexcharts';
import auth from '@/middleware/auth';
import { definePageMeta } from '#imports';
import * as bankData from '@/data/financialData.js';

definePageMeta({
  layout: 'maindashboard',
  middleware: [auth],
});

// Données importées depuis bankData.js
const accountBalance = ref(bankData.accountBalance);
const fullname = ref(bankData.fullname);
const targetProgress = ref(bankData.targetProgress);
const creditCardBalance = ref(bankData.creditCardBalance);
const creditCardLimit = ref(bankData.creditCardLimit);
const savingsBalance = ref(bankData.savingsBalance);
const savingsGrowth = ref(bankData.savingsGrowth);
const recentTransactions = ref(bankData.recentTransactions);
const spendingData = bankData.spendingData;
const progressOptions = ref(bankData.progressOptions);
const progressSeries = ref(bankData.progressSeries);
const balanceOptions = bankData.balanceOptions;
const balanceSeries = bankData.balanceSeries;
const incomeExpenseOptions = bankData.incomeExpenseOptions;
const incomeExpenseSeries = bankData.incomeExpenseSeries;
const financialGoals = ref(bankData.financialGoals);
const latestNews = ref(bankData.latestNews);
const recentActivities = ref(bankData.recentActivities);
</script>
<template>
  <!-- Début du tableau de bord -->
  <div class="row">
    <!-- Carte Solde Disponible -->
    <div class="col-lg-3 col-md-6">
      <div class="card custom-card progress-card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <div class="fw-semibold fs-16 text-white mb-1">Solde Disponible</div>
              <h4 class="fw-bold text-white mb-1">{{ accountBalance }} EUR</h4>
              <a href="javascript:void(0);" class="text-white">Voir plus</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Carte Carte de Crédit -->
    <div class="col-lg-3 col-md-6">
      <div class="card custom-card info-card">
        <div class="card-body">
          <p class="text-muted mb-0">Carte de Crédit</p>
          <h5 class="fw-semibold mt-1">{{ creditCardBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h5>
          <p class="mb-0 text-danger fw-semibold">Limite : {{ creditCardLimit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</p>
        </div>
      </div>
    </div>

    <!-- Carte Compte Épargne -->
    <div class="col-lg-3 col-md-6">
      <div class="card custom-card info-card">
        <div class="card-body">
          <p class="text-muted mb-0">Compte Épargne</p>
          <h5 class="fw-semibold mt-1">{{ savingsBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h5>
          <p class="mb-0 text-success fw-semibold">+{{ savingsGrowth }}% ce mois</p>
        </div>
      </div>
    </div>

    <!-- Carte Objectifs Financiers -->
    <div class="col-lg-3 col-md-6">
      <div class="card custom-card info-card">
        <div class="card-body">
          <p class="text-muted mb-0">Objectifs Financiers</p>
          <h5 class="fw-semibold mt-1">{{ financialGoals.length }}</h5>
        </div>
      </div>
    </div>

    <!-- Graphique de l'évolution du solde -->
    <div class="col-xl-6">
      <div class="card custom-card">
        <div class="card-header">
          <div class="card-title">
            Évolution du Solde
          </div>
        </div>
        <div class="card-body">
          <apexchart type="line" :options="balanceOptions" :series="balanceSeries"></apexchart>
        </div>
      </div>
    </div>

    <!-- Graphique Revenus vs Dépenses -->
    <div class="col-xl-6">
      <div class="card custom-card">
        <div class="card-header">
          <div class="card-title">
            Revenus vs Dépenses
          </div>
        </div>
        <div class="card-body">
          <apexchart type="bar" :options="incomeExpenseOptions" :series="incomeExpenseSeries"></apexchart>
        </div>
      </div>
    </div>

    <!-- Transactions Récentes -->
    <div class="col-xl-6 col-lg-12">
      <div class="card custom-card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div class="card-title">
            Transactions Récentes
          </div>
          <button class="btn btn-sm btn-primary d-lg-none" @click="toggleDetails">
            {{ showDetails ? 'Masquer' : 'Voir Plus' }}
          </button>
        </div>
        <div class="card-body p-0 table-responsive">
          <table class="table text-nowrap table-hover mb-0">
            <thead class="table-light">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Montant</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(transaction, index) in recentTransactions.slice(0, showDetails ? 5 : 3)" :key="index">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.description }}</td>
              <td :class="{'text-success': transaction.type === 'Crédit', 'text-danger': transaction.type === 'Débit'}">
                {{ transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Objectifs Financiers -->
    <div class="col-xl-6">
      <div class="card custom-card">
        <div class="card-header">
          <div class="card-title">
            Objectifs Financiers
          </div>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li v-for="(goal, index) in financialGoals" :key="index" class="list-group-item">
              <div class="d-flex justify-content-between">
                <span>{{ goal.goal }}</span>
                <span>{{ goal.progress }}%</span>
              </div>
              <div class="progress progress-xs mt-2">
                <div class="progress-bar" :style="{ width: goal.progress + '%' }"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Actualités Bancaires -->
    <div class="col-xl-4">
      <div class="card custom-card">
        <div class="card-header">
          <div class="card-title">
            Actualités Bancaires
          </div>
        </div>
        <div class="card-body">
          <ul class="list-unstyled">
            <li v-for="(news, index) in latestNews" :key="index" class="mb-3">
              <h6 class="mb-1">{{ news.title }}</h6>
              <small class="text-muted">{{ news.date }}</small>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Dépenses par Catégorie -->
    <div class="col-xl-4">
      <div class="card custom-card">
        <div class="card-header">
          <div class="card-title">
            Dépenses par Catégorie
          </div>
        </div>
        <div class="card-body">
          <DoughnutChart :chartData="spendingData" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>
    </div>

    <!-- Activités Récentes -->
    <div class="col-xl-4">
      <div class="card custom-card">
        <div class="card-header">
          <div class="card-title">
            Activités Récentes
          </div>
        </div>
        <div class="card-body">
          <ul class="list-unstyled mb-0">
            <li v-for="(activity, index) in recentActivities" :key="index" class="mb-3">
              <div class="d-flex align-items-top">
                <div class="me-2">
                    <span :class="['avatar', 'avatar-xs', 'avatar-rounded', activity.iconBg]">
                      <i :class="activity.icon"></i>
                    </span>
                </div>
                <div>
                  <span>{{ activity.description }}</span>
                  <div class="text-muted fs-12">{{ activity.time }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style pour la carte rouge personnalisée */
.progress-card {
  background-color: #01bcb9; /* Couleur rouge */
  border-radius: 10px;
  color: #fff;
  padding: 15px;
}

.progress-card .card-body {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-white {
  color: #ffffff !important;
}

/* Styles pour réduire la taille des éléments */
.info-card {
  padding: 15px;
}
.info-card h5 {
  font-size: 1.2rem;
}
.card.custom-card {
  margin-bottom: 15px;
}
.card.custom-card .card-body {
  padding: 15px;
}
.table th, .table td {
  padding: 8px;
  font-size: 0.9rem;
}
.list-group-item {
  padding: 10px 15px;
}
.list-group-item .progress {
  height: 6px;
}
.avatar-xs {
  width: 30px;
  height: 30px;
}
.card-img-top {
  height: 100px;
  object-fit: cover;
}
</style>

