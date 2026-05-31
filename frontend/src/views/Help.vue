<template>
  <div class="help">
    <div class="help-grid">
      <!-- FAQ -->
      <section class="help-section">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <div class="faq-list">
          <div v-for="(faq, i) in faqs" :key="i" class="faq-item" @click="toggle(i)">
            <div class="faq-question">
              <span>{{ faq.q }}</span>
              <span class="faq-arrow" :class="{ open: openIdx === i }">&#x25BE;</span>
            </div>
            <div v-show="openIdx === i" class="faq-answer">{{ faq.a }}</div>
          </div>
        </div>
      </section>

      <!-- Quick Guide -->
      <section class="help-section">
        <h2 class="section-title">Quick Guide</h2>
        <div class="guide-steps">
          <div v-for="(step, i) in steps" :key="i" class="guide-step">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-content">
              <div class="step-title">{{ step.title }}</div>
              <div class="step-desc">{{ step.desc }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Data Sources -->
    <section class="sources-section">
      <h2 class="section-title">Data Sources</h2>
      <div class="sources-grid">
        <div v-for="src in sources" :key="src.name" class="source-card">
          <div class="src-name">{{ src.name }}</div>
          <div class="src-desc">{{ src.desc }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const openIdx = ref<number | null>(0)
function toggle(i: number) {
  openIdx.value = openIdx.value === i ? null : i
}

const faqs = [
  { q: 'What is FFSDB?', a: 'FFSDB (Food Fermentation Strain Database) is a research platform specifically designed for food fermentation microorganisms, integrating gene sequences, protein structures, and homology information.' },
  { q: 'How do I search for a strain?', a: 'Use the search bar on the Home page. Enter an NCBI gene ID, gene name, or fermented food type (e.g., "steamed bun" or "Bacillus") and click Search.' },
  { q: 'How do I use the Server tools?', a: 'Navigate to the Server page, select a prediction tool from the sidebar, input your FASTA sequence or select a food/strain, then click Submit.' },
  { q: 'How can I download datasets?', a: 'Visit the Download page to access complete datasets for all five prediction models in standard formats.' },
  { q: 'What databases does FFSDB integrate?', a: 'FFSDB integrates data from NCBI, UniProt, ENA, and EMBL databases, covering gene sequences, protein structures, and homology information.' },
]

const steps = [
  { title: 'Search or Browse', desc: 'Use the Home search bar for quick lookups, or visit the Browse page to explore by food type, species, or region.' },
  { title: 'Explore Details', desc: 'Click on any strain or food item to view detailed information including gene sequences and protein structures.' },
  { title: 'Use Prediction Tools', desc: 'Navigate to Server to access five AI-powered tools for strain analysis, flavour prediction, and safety assessment.' },
  { title: 'Download Data', desc: 'Access the Download page to obtain complete model datasets for offline research and analysis.' },
]

const sources = [
  { name: 'NCBI', desc: 'National Center for Biotechnology Information — gene sequences and taxonomic data.' },
  { name: 'UniProt', desc: 'Comprehensive protein sequence and functional annotation resource.' },
  { name: 'ENA', desc: 'European Nucleotide Archive — nucleotide sequence data.' },
  { name: 'EMBL', desc: 'European Molecular Biology Laboratory — molecular biology data.' },
]
</script>

<style scoped>
.help {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}

.help-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.help-section {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e8d8d0;
  box-shadow: 0 2px 10px rgba(93,24,13,0.05);
}

.section-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--maroon);
  margin-bottom: 1.5rem;
  padding-bottom: 0.6rem;
  border-bottom: 3px solid var(--cream2);
}

/* FAQ */
.faq-list { display: flex; flex-direction: column; gap: 0.6rem; }
.faq-item {
  border: 1px solid #e8d8d0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1.2rem;
  font-weight: 600;
  font-size: 0.9rem;
  background: var(--cream);
  color: var(--dark);
  transition: background 0.2s;
}
.faq-item:hover .faq-question { background: var(--cream2); }
.faq-arrow { transition: transform 0.2s; color: var(--maroon); }
.faq-arrow.open { transform: rotate(180deg); }
.faq-answer {
  padding: 0.9rem 1.2rem;
  font-size: 0.88rem;
  color: #666;
  line-height: 1.6;
  background: #fff;
  border-top: 1px solid #f0e8e4;
}

/* Guide */
.guide-steps { display: flex; flex-direction: column; gap: 1rem; }
.guide-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: var(--cream);
  border-radius: 8px;
  border: 1px solid #e8d8d0;
}
.step-num {
  background: var(--maroon);
  color: #fff;
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 0.85rem;
  flex-shrink: 0;
}
.step-title { font-weight: 700; color: var(--dark); font-size: 0.92rem; margin-bottom: 0.25rem; }
.step-desc { font-size: 0.84rem; color: #888; line-height: 1.5; }

/* Sources */
.sources-section {
  background: #fff;
  border-radius: 12px;
  padding: 2rem 2.5rem;
  border: 1px solid #e8d8d0;
  box-shadow: 0 2px 10px rgba(93,24,13,0.05);
}
.sources-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
}
.source-card {
  background: var(--cream);
  border: 1px solid #e8d8d0;
  border-radius: 10px;
  padding: 1.2rem;
  text-align: center;
  transition: all 0.2s;
}
.source-card:hover { border-color: var(--maroon); transform: translateY(-3px); }
.src-name { font-size: 1.1rem; font-weight: 800; color: var(--maroon); margin-bottom: 0.5rem; }
.src-desc { font-size: 0.8rem; color: #888; line-height: 1.5; }

@media (max-width: 900px) {
  .help-grid { grid-template-columns: 1fr; }
  .sources-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
