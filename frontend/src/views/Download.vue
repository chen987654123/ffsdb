<template>
  <div class="download-page">
    
    <!-- Section 1 -->
    <div class="accordion-panel">
      <div class="accordion-header">
        <span class="triangle">▼</span> Download
      </div>
      <div class="accordion-body">
        <div class="card-container">
          <div class="card-inner">
            <div class="card-row" v-for="(ds, i) in datasets" :key="i">
              <span class="row-name">{{ ds.name }}</span>
              <div class="row-action" @click="downloadDataset(ds.id)">
                <svg viewBox="0 0 24 24" class="dl-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span class="action-text">dataset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2 -->
    <div class="accordion-panel">
      <div class="accordion-header">
        <span class="triangle">▼</span> Microbiology Research Tools
      </div>
      <div class="accordion-body">
         <div class="card-container">
           <div class="card-inner">
             <div class="card-row" v-for="(tool, i) in resTools" :key="i">
               <span class="row-name">{{ tool.name }}</span>
             </div>
           </div>
         </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDatasets, getDatasetUrl } from '../api/index'

const datasets = ref([
  { id: '1', name: 'Prediction of superior microbial strains' },
  { id: '2', name: 'Prediction of flavour compounds' },
  { id: '3', name: 'Prediction of synergistic fermentation effects' },
  { id: '4', name: 'Prediction of synthetic microbial community formula' },
  { id: '5', name: 'Prediction of protein functions' }
])

onMounted(async () => {
  try {
    const data = await getDatasets()
    if (Array.isArray(data) && data.length > 0 && data[0].name) {
      datasets.value = data
    }
  } catch {}
})

async function downloadDataset(id: string) {
  try {
    const res = await getDatasetUrl(id)
    if (res?.url) window.open(res.url, '_blank')
    else alert('Download URL pending for dataset ' + id)
  } catch {
    alert('Download URL pending for dataset ' + id)
  }
}

const resTools = [
  { name: 'NCBI Genome' },
  { name: 'gutMGene' },
  { name: 'MASI' },
  { name: 'webMGA' }
]
</script>

<style scoped>
.download-page {
  max-width: 900px;
  margin: 3rem auto 5rem;
  font-family: Arial, Helvetica, sans-serif;
}

.accordion-panel {
  margin-bottom: 3rem;
}

.accordion-header {
  background-color: #a21c29;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.triangle {
  font-size: 0.8rem;
}

.accordion-body {
  padding: 1.5rem 1rem;
}

.card-container {
  background: white;
  border: 5px solid #dcdcdc;
  box-shadow: 6px 6px 15px rgba(0,0,0,0.15);
  padding: 1.5rem;
}

.card-inner {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background-color: #f5f5f5;
}

.card-row:nth-child(even) {
  background-color: #ffffff;
}

.row-name {
  color: #111;
  font-size: 1.05rem;
}

.row-action {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
}

.dl-icon {
  width: 24px;
  height: 24px;
  color: #888;
  stroke: #888;
  transition: stroke 0.2s;
}

.action-text {
  font-size: 1rem;
  color: #222;
  transition: color 0.2s;
}

.row-action:hover .dl-icon {
  stroke: #a21c29;
}

.row-action:hover .action-text {
  color: #a21c29;
}
</style>
