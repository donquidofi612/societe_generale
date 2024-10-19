<template>
  <Switcher />
  <div class="page">
    <Header />
    <Sidebar />
    
        <!-- Start::app-content -->
        <div class="main-content app-content">
            <div class="container-fluid">
              <!-- Start::page-header -->
              <div class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                <div>
                    <p class="fw-semibold fs-18 mb-0">Bon retour {{fullname}}!</p>
                    <span class="fs-semibold text-muted">Dernière connexion: {{currentDateTime}}.</span>
                  <p class="fw-semibold text-success mb-0">Compte actif</p>
                </div>
                <div class="btn-list mt-md-0 mt-2">
                    <button type="button" class="btn btn-primary btn-wave">
                        <i class="ri-filter-3-fill me-2 align-middle"></i>Filters
                    </button>
                    <button type="button" class="btn btn-outline-secondary btn-wave">
                        <i class="ri-upload-cloud-line me-2 align-middle"></i>Export
                    </button>
                </div>
              </div>
              <!-- End::page-header -->
              <slot></slot>
            </div>
        </div>
        <!-- End::app-content -->
      <Footer />
  </div>
  <BackToTop />
</template>
<script lang="ts">
import Header from "@/components/common/header.vue";
import Sidebar from "@/components/common/sidebar.vue";
import Footer from "@/components/common/footer.vue";
import Switcher from "@/components/common/switcher.vue";
import BackToTop from "@/components/common/backtotop.vue";
import PageHeader from "@/components/common/pageheader.vue";
export default {
  components: {
    Header,
    Sidebar,
    Footer,
    Switcher,
    PageHeader,
    BackToTop
  },
};
</script>
<script lang="ts" setup>

import * as bankData from '@/data/financialData.js';
import {ref} from "vue";
// Créer une référence pour stocker la date et l'heure actuelle
const currentDateTime = ref('');
const fullname = ref(bankData.fullname);

// Fonction pour formater la date et l'heure sans les secondes
const getCurrentDateTime = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  };
  currentDateTime.value = now.toLocaleDateString('fr-FR', options);
};

// Appeler la fonction pour initialiser la date et l'heure
getCurrentDateTime();

// Mettre à jour la date et l'heure toutes les minutes
setInterval(() => {
  getCurrentDateTime();
}, 60000);

</script>
<style lang=""></style>
