<template>
  <div class="details-page" v-if="item">
    <div class="top-header">
      <span class="triangle">▼</span> Browse according to species
    </div>

    <div class="card-container">
      <div class="content-wrapper">
        <!-- Left Column -->
        <div class="left-column">
          <img :src="item.image" :alt="item.name" class="detail-hero-img">
          <h2 class="item-title">{{ item.name }}</h2>

          <!-- Category -->
          <template v-if="item.sections['Category']">
            <div class="divider">
              <div class="line-wrapper"><div class="dot"></div><div class="horiz-line"></div><div class="dot"></div></div>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#a91e2c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
                <path d="M12 20a10 10 0 0 0 5-18M12 20a10 10 0 0 1-5-18"/>
                <path d="M12 4V2M15 4c-3-2-6-2-6 0"/>
              </svg>
              <div class="line-wrapper"><div class="dot"></div><div class="horiz-line"></div><div class="dot"></div></div>
            </div>
            <div class="field-label">Category</div>
            <div class="field-value">{{ item.sections['Category'] }}</div>
          </template>

          <!-- Ingredients -->
          <template v-if="item.sections['Ingredients']">
            <div class="divider">
              <div class="line-wrapper"><div class="dot"></div><div class="horiz-line"></div><div class="dot"></div></div>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#a91e2c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 18h8" />
                <path d="M3 22h18" />
                <path d="M14 22a7 7 0 1 0 0-14h-1" />
                <path d="M9 14h2" />
                <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
                <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
              </svg>
              <div class="line-wrapper"><div class="dot"></div><div class="horiz-line"></div><div class="dot"></div></div>
            </div>
            <div class="field-label">Ingredients</div>
            <div class="field-value">{{ item.sections['Ingredients'] }}</div>
          </template>

          <!-- Microbial strains -->
          <template v-if="item.sections['Microbial Strains'] || item.sections['Microbial strains']">
            <div class="divider">
              <div class="line-wrapper"><div class="dot"></div><div class="horiz-line"></div><div class="dot"></div></div>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#a91e2c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="10" cy="10" r="1.5" fill="#a91e2c" />
                <circle cx="14" cy="14" r="1.5" fill="#a91e2c" />
                <circle cx="15" cy="9" r="1" fill="#a91e2c" />
                <circle cx="9" cy="14" r="1" fill="#a91e2c" />
                <circle cx="12" cy="16" r="1" fill="#a91e2c" />
              </svg>
              <div class="line-wrapper"><div class="dot"></div><div class="horiz-line"></div><div class="dot"></div></div>
            </div>
            <div class="field-label">Microbial strains</div>
            <div class="field-value">{{ item.sections['Microbial Strains'] || item.sections['Microbial strains'] }}</div>
          </template>

          <!-- For microbes, show classification if no normal tags exist -->
          <template v-if="item.classification && !item.sections['Category']">
             <div class="divider">
              <div class="line-wrapper"><div class="dot"></div><div class="horiz-line"></div><div class="dot"></div></div>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#a91e2c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
              <div class="line-wrapper"><div class="dot"></div><div class="horiz-line"></div><div class="dot"></div></div>
            </div>
            <div class="field-label">Classification</div>
            <div class="field-value text-sm">
               <div v-for="(v, k) in item.classification" :key="k">
                 {{ k }}: {{ v }}
               </div>
            </div>
          </template>
        </div>

        <!-- Right Column -->
        <div class="right-column">
          <div class="right-item" v-for="(section, title) in rightSections" :key="title">
            <template v-if="typeof section === 'string'">
              <strong>{{ title }}:</strong> <span v-html="formatContent(section)"></span>
            </template>
            <template v-else>
              <strong>{{ title }}:</strong>
              <div class="nested-list">
                <div v-for="(v, k) in section" :key="k" class="nested-list-item">
                   <span class="nested-label">{{ k }}:</span>
                   <span class="nested-value">{{ v }}</span>
                </div>
              </div>
            </template>
          </div>
          
          <div class="right-item" v-if="item.quickStats && item.quickStats['Origin']">
            <strong>Place of Origin:</strong> <span>{{ item.quickStats['Origin'] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading-state">
    <div class="spinner"></div>
    <p>Loading database record or item not found...</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue';

// Images
import imgSourSoup from '../assets/images/image31.png';
import imgLCasei from '../assets/images/image102.png';
import imgSCerevisiae from '../assets/images/image92.png';
import imgYoghurt from '../assets/images/image23.jpeg';

const route = useRoute();
const item = ref<any>(null);

const mockData: Record<string, any> = {
  'Sour Soup': {
    name: 'Sour Soup',
    tags: ['Fermented Fruit/Vegetable', 'Guizhou'],
    image: imgSourSoup,
    sections: {
      'Microbial Strains': 'Lactic acid bacteria, yeast, etc.',
      'Category': 'Fermented Fruits and Vegetables',
      'Ingredients': 'Tomatoes, red peppers, etc.',
      'Nutritional components': 'Contains lactic acid, lycopene, amino acids, vitamin B, minerals, and dietary fiber.',
      'The role of fermenting microorganisms': 'Lactic acid bacteria break down carbohydrates to produce lactic acid, establishing the sour flavor profile; Yeast generates flavor compounds such as esters, enriching the aroma.',
      'Functional Benefits': 'Promotes intestinal motility and regulates gut microbiota balance; lactic acid bacteria enhance digestive capacity; capsaicin and other components stimulate blood circulation, stimulate appetite, and reduce greasiness; rich in vitamin C and organic acids to support antioxidant activity and nutrient absorption.',
      'Fermentation Process': 'Using tomatoes and peppers as the base, mix in salt and high-proof white liquor before sealing in a jar. Seal with water to block oxygen, then let sit undisturbed. Allow lactic acid bacteria and other microorganisms to ferment naturally.'
    },
    quickStats: { 'Origin': 'Centered in the Qiandongnan region of Guizhou Province.', 'Primary pH': '3.2 - 3.8', 'Microbes': 'LAB, Yeast' }
  },
  'Lactobacillus casei': {
    name: 'Lactobacillus casei',
    scientificName: 'Lactobacillus casei',
    tags: ['Bacteria', 'LAB', 'GRAS'],
    image: imgLCasei,
    classification: { 'Kingdom': 'Bacteria', 'Phylum': 'Firmicutes', 'Class': 'Bacilli', 'Order': 'Lactobacillales', 'Family': 'Lactobacillaceae', 'Genus': 'Lactobacillus', 'Species': 'L. casei' },
    sections: {
      'Morphology': 'Short rod-shaped, non-spore-forming, non-motile.',
      'Physiological and Biochemical Characteristics': { 'Respiration Type': 'Facultative anaerobic, Microaerophilic', 'Optimal Growth Temperature': '25–37 °C', 'Optimal Growth pH': '5.5–6.5' },
      'Core Fermentation Functions': 'Produce lactic acid, rapidly lower pH, and create the characteristic sourness of fermented foods. Enhance flavor and aroma by producing small amounts of flavor compounds such as alcohols, aldehydes, esters, etc. Colonize the gut, regulate intestinal microbiota, promote digestion, and boost immunity.'
    },
    quickStats: { 'Origin': 'Widespread in raw dairy and plant materials', 'Safety': 'GRAS (FAO/WHO)', 'Gram Stain': 'Positive', 'Fermented Foods': 'Yogurt, Kimchi, Fermented Sausages' }
  },
  'Saccharomyces cerevisiae': {
    name: 'Saccharomyces cerevisiae',
    scientificName: 'Saccharomyces cerevisiae',
    tags: ['Fungi', 'Yeast', 'GRAS'],
    image: imgSCerevisiae,
    classification: { 'Kingdom': 'Fungi', 'Phylum': 'Ascomycota', 'Class': 'Hemiascomycetes', 'Order': 'Saccharomycetales', 'Family': 'Saccharomycetaceae', 'Genus': 'Saccharomyces', 'Species': 'S. cerevisiae' },
    sections: {
      'Morphology': 'Ovoid or spherical, single-celled, non-motile.',
      'Core Fermentation Functions': 'Under anaerobic conditions, it breaks down sugars into alcohol and carbon dioxide, serving as the core mechanism for brewing and bread leavening. It produces flavor compounds such as esters, aldehydes, and higher alcohols, imparting distinctive aromas and palate characteristics to alcoholic beverages and foods.'
    },
    quickStats: { 'Origin': 'Widely distributed in nature, especially on fruit skins', 'Respiration': 'Facultative Anaerobic', 'Optimal Temp': '28–32 °C', 'Fermented Foods': 'Wine, Beer, Bread' }
  },
  'Yoghurt': {
    name: 'Yoghurt',
    tags: ['Dairy', 'Probiotic'],
    image: imgYoghurt,
    sections: {
      'Category': 'Fermented Dairy Product',
      'Ingredients': 'Milk, sugar, cultures',
      'Microbial Strains': 'Lactobacillus bulgaricus, Streptococcus thermophilus.',
      'Introduction': 'Yoghurt is a food produced by bacterial fermentation of milk. The bacteria used to make yoghurt are known as yoghurt cultures.',
      'Health Benefits': 'Rich in protein, calcium, riboflavin, vitamin B6 and vitamin B12. It has nutritional benefits beyond those of milk.',
      'Fermentation Process': 'Pasteurized milk is cooled and inoculated with cultures, then incubated at 40-45°C until pH drops to ~4.5. Lactic acid bacteria ferment lactose into lactic acid, creating the sour tart flavor and causing milk proteins to coagulate into a thick texture.',
    },
    quickStats: { 'Origin': 'Global, originated in Central Asia', 'pH': '4.0 - 4.6', 'Probiotics': 'High' }
  }
};

const loadItem = () => {
  const name = decodeURIComponent(route.params.id as string);
  const found = mockData[name];

  if (found) {
    item.value = { ...found };
  } else {
    // If not found in mockData, we create a generic fallback based on the name
    item.value = {
      ...mockData['Sour Soup'],
      name: name
    };
  }

  // If a dynamic image is passed via query params, prioritize it!
  if (route.query.img) {
    item.value.image = route.query.img as string;
  }
};

onMounted(loadItem);
watch(() => route.params.id, loadItem);

const formatContent = (content: string) => content.replace(/\n/g, '<br>');

const rightSections = computed(() => {
  if (!item.value || !item.value.sections) return {};
  const excluded = ['Category', 'Ingredients', 'Microbial Strains', 'Microbial strains'];
  const res: Record<string, any> = {};
  for (const [k, v] of Object.entries(item.value.sections)) {
    if (!excluded.includes(k)) {
      res[k] = v;
    }
  }
  return res;
});
</script>

<style scoped>
.details-page {
  max-width: 900px;
  margin: 3rem auto 5rem;
  font-family: Arial, Helvetica, sans-serif;
}

.top-header {
  background-color: #a21c29;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.triangle {
  font-size: 0.8rem;
}

.card-container {
  background: white;
  border: 5px solid #dcdcdc;
  box-shadow: 6px 6px 15px rgba(0,0,0,0.15);
}

.content-wrapper {
  display: flex;
  min-height: 600px;
}

.left-column {
  width: 32%;
  background-color: #f6e6dc;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.detail-hero-img {
  width: 100%;
  max-width: 220px;
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid #111;
  margin-bottom: 1rem;
  background-color: #000;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
  cursor: pointer;
}

.detail-hero-img:hover {
  transform: scale(1.08) translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.item-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #000;
  margin: 0.5rem 0 1.5rem;
}

.divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.5rem 0 0.8rem;
}

.line-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #a21c29;
}

.horiz-line {
  flex: 1;
  height: 1.5px;
  background-color: #a21c29;
}

.icon {
  width: 32px;
  height: 32px;
  margin: 0 12px;
}

.field-label {
  font-weight: 800;
  color: #000;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.field-value {
  color: #000;
  font-size: 1rem;
  font-weight: 500;
}

.text-sm {
  font-size: 0.85rem;
  line-height: 1.4;
}

.right-column {
  width: 68%;
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.right-item {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #111;
}

.right-item strong {
  font-weight: bold;
  color: #000;
}

.nested-list {
  padding-left: 20px;
  margin-top: 5px;
}

.nested-list-item {
  margin-bottom: 0.3rem;
}

.nested-label {
  font-weight: 600;
  color: #333;
}

.nested-value {
  color: #111;
}

.loading-state {
  text-align: center;
  padding: 10rem 0;
  color: #7f8c8d;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ebf5fb;
  border-top-color: #3498db;
  border-radius: 50%;
  margin: 0 auto 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 800px) {
  .content-wrapper {
    flex-direction: column;
  }
  .left-column, .right-column {
    width: 100%;
  }
  .top-header {
    margin: 1rem;
  }
}
</style>

