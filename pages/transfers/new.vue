<template>
  <PageHeader :propData="dataToPass" />

  <div class="row">
    <!-- Formulaire de Virement -->
    <div class="col-xl-6">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">Nouveau Virement</div>
        </div>
        <div class="card-body">
          <form @submit.prevent="submitTransfer">
            <div class="mb-3">
              <label for="beneficiary" class="form-label">Bénéficiaire</label>
              <input
                  type="text"
                  class="form-control"
                  id="beneficiary"
                  v-model="transfer.beneficiary"
                  placeholder="Nom du bénéficiaire"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email du Bénéficiaire</label>
              <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="transfer.email"
                  placeholder="Email du bénéficiaire"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="iban" class="form-label">IBAN du Bénéficiaire</label>
              <input
                  type="text"
                  class="form-control"
                  id="iban"
                  v-model="transfer.iban"
                  placeholder="Numéro IBAN"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="amount" class="form-label">Montant</label>
              <input
                  type="number"
                  class="form-control"
                  id="amount"
                  v-model="transfer.amount"
                  placeholder="Montant"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="executionDate" class="form-label">Date d'exécution</label>
              <input
                  type="date"
                  class="form-control"
                  id="executionDate"
                  v-model="transfer.executionDate"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="reason" class="form-label">Motif</label>
              <textarea
                  class="form-control"
                  id="reason"
                  v-model="transfer.reason"
                  placeholder="Motif du virement"
                  rows="3"
                  required
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="recurring" class="form-label">Virement récurrent</label>
              <select class="form-select" id="recurring" v-model="transfer.recurring">
                <option value="non">Non</option>
                <option value="hebdomadaire">Hebdomadaire</option>
                <option value="mensuel">Mensuel</option>
                <option value="annuel">Annuel</option>
              </select>
            </div>
            <div class="mb-3 form-check">
              <input
                  type="checkbox"
                  class="form-check-input"
                  id="confirmDetails"
                  v-model="transfer.confirmDetails"
              />
              <label class="form-check-label" for="confirmDetails">J'ai vérifié les informations saisies</label>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="!transfer.confirmDetails">
              Valider le Virement
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Liste des Virements -->
    <div class="col-xl-6">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">Liste des Virements</div>
        </div>
        <div class="card-body">
          <ul v-if="transferList.length > 0">
            <li v-for="(item, index) in transferList" :key="index">
              <strong>{{ item.beneficiary }}</strong> - {{ item.amount }} EUR - {{ item.executionDate }} <span style="color: #c6ae3f">En attente</span>
            </li>
          </ul>
          <p v-else>Aucun virement enregistré.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Récapitulatif -->
  <div v-if="showSummary" class="modal" style="display:block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Résumé du Virement</h5>
          <button type="button" class="btn-close" @click="cancelTransfer"></button>
        </div>
        <div class="modal-body">
          <p><strong>Bénéficiaire :</strong> {{ transfer.beneficiary }}</p>
          <p><strong>Email :</strong> {{ transfer.email }}</p>
          <p><strong>IBAN :</strong> {{ transfer.iban }}</p>
          <p><strong>Montant :</strong> {{ transfer.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</p>
          <p><strong>Date d'exécution :</strong> {{ transfer.executionDate }}</p>
          <p><strong>Motif :</strong> {{ transfer.reason }}</p>
          <p><strong>Virement récurrent :</strong> {{ transfer.recurring !== 'non' ? transfer.recurring : 'Non' }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click="confirmTransfer">Confirmer le Virement</button>
          <button class="btn btn-secondary" @click="cancelTransfer">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import auth from '@/middleware/auth';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

export default {
  setup() {
    definePageMeta({
      middleware: [auth],
    });

    const transfer = ref({
      beneficiary: '',
      email: '',
      iban: '',
      amount: 0,
      executionDate: '',
      reason: '',
      recurring: 'non',
      confirmDetails: false,
    });

    const showSummary = ref(false);
    const transferList = ref([]);

    const submitTransfer = () => {
      if (transfer.value.beneficiary && transfer.value.email && transfer.value.iban && transfer.value.amount && transfer.value.executionDate && transfer.value.reason) {
        showSummary.value = true;
      }
    };

    const confirmTransfer = async () => {
      const result = await Swal.fire({
        title: 'Confirmation',
        text: 'Confirmez-vous ce virement ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, confirmer',
        cancelButtonText: 'Annuler',
      });

      if (result.isConfirmed) {
        try {
          // Appeler l'API pour envoyer le mail et enregistrer les infos
          await sendEmailAndSaveTransfer(transfer.value);

          Swal.fire('Virement confirmé !', 'Votre virement a bien été enregistré et un email a été envoyé.', 'success');
          resetForm();
          getTransfers();  // Mise à jour de la liste après enregistrement
        } catch (error) {
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'enregistrement.', 'error');
        }
      }
    };

    const sendEmailAndSaveTransfer = async (transferData: any) => {
      try {
        // Envoyer les données du virement et l'email via une seule API
        const response = await fetch('/api/sendAndSaveTransfer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: transferData.email,
            subject: 'Confirmation de Virement',
            message: `Votre virement de ${transferData.amount} EUR a été confirmé.\n\nDétails :\n- IBAN : ${transferData.iban}\n- Montant : ${transferData.amount} EUR\n- Date d'exécution : ${transferData.executionDate}\n\nMerci.`,
            transfer: transferData,  // Envoie également les détails du virement pour l'enregistrement
          }),
        });

        const data = await response.json();
        if (!data.success) {
          console.error('Erreur lors de l\'envoi et de l\'enregistrement');
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi et de l\'enregistrement', error);
      }
    };

    const cancelTransfer = () => {
      showSummary.value = false;
    };

    const resetForm = () => {
      transfer.value = {
        beneficiary: '',
        email: '',
        iban: '',
        amount: 0,
        executionDate: '',
        reason: '',
        recurring: 'non',
        confirmDetails: false,
      };
      showSummary.value = false;
    };

    // Fonction pour récupérer la liste des virements
    const getTransfers = async () => {
      try {
        const response = await fetch('/api/getTransfers');
        transferList.value = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des virements', error);
      }
    };

    // Charger la liste des virements au démarrage de la page
    onMounted(() => {
      getTransfers();
    });

    const dataToPass = {
      current: "Nouveau Virement",
      list: ['Virements', 'Nouveau Virement'],
    };

    return {
      dataToPass,
      transfer,
      showSummary,
      transferList,
      submitTransfer,
      confirmTransfer,
      cancelTransfer,
      resetForm,
    };
  },
  components: {
    PageHeader,
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}

.card-header {
  background: #007bff;
  color: #fff;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.form-check-input {
  cursor: pointer;
}

.btn {
  min-width: 120px;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  width: 500px;
}
</style>
