<template>
  <div class="browse">
    <!-- Species Accordion -->
    <div class="accordion">
      <div class="accordion-header" @click="toggle('species')">
        <span class="icon">{{ openPanel === 'species' ? '&#x25BC;' : '&#x25B6;' }}</span>
        Browse according to species
      </div>
      <div class="accordion-content" v-show="openPanel === 'species'">
        
        <h2 :id="activeSection" class="sub-title">{{ currentSpeciesTitle }}</h2>
        <div class="food-section">
          <div class="food-grid">
            <div
              v-for="item in currentList" :key="item.name"
              class="food-card"
              @click="$router.push({ path: '/details/' + encodeURIComponent(item.name), query: { img: item.img } })"
            >
              <div class="food-img-wrap">
                <img :src="item.img" :alt="item.name" class="food-img" />
                <div class="food-overlay">Explore</div>
              </div>
              <div class="food-name">
                <i v-if="activeSection !== 'food'">{{ item.name }}</i>
                <span v-else>{{ item.name }}</span>
              </div>
            </div>
          </div>
          <div class="pagination">
            <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)" class="pg-arrow">&#x2039;</button>
            <span v-for="(p, i) in pageList" :key="i">
              <span v-if="p === '...'" class="pg-ellipsis">…</span>
              <button v-else :class="{ active: p === currentPage }" @click="changePage(Number(p))">{{ p }}</button>
            </span>
            <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)" class="pg-arrow">&#x203A;</button>
          </div>
        </div>

      </div>
    </div>

    <!-- Dynamic Accordion (Region or Pathway) -->
    <div class="accordion">
      <div class="accordion-header" @click="toggle('second')">
        <span class="icon">{{ openPanel === 'second' ? '&#x25BC;' : '&#x25B6;' }}</span>
        Browse according to {{ activeSection === 'food' ? 'region' : 'pathway' }}
      </div>
      <div class="accordion-content" v-show="openPanel === 'second'">
        <div class="region-section">
          <img v-if="activeSection === 'food'" src="../assets/cuts/图片1.png" alt="Browse by Region" class="placeholder-img" />
          <img v-else-if="activeSection === 'bacteria'" src="../assets/cuts/图片2.png" alt="Browse by Pathway" class="placeholder-img" />
          <img v-else-if="activeSection === 'fungi'" src="../assets/cuts/图片3.png" alt="Browse by Pathway" class="placeholder-img" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getFermentedFoods, getBacteria, getFungi } from '../api/index'

const route = useRoute()
const openPanel = ref('species')
const activeSection = ref('food')
const currentPage = ref(1)
const totalPages = ref(25)

const currentSpeciesTitle = computed(() => {
  if (activeSection.value === 'bacteria') return 'Bacteria'
  if (activeSection.value === 'fungi') return 'Fungi'
  return 'Fermented foods'
})

// fallback data
const fermentedFoods = ref([
  { name: 'Steamed bun', img: '/ffsdb/images/image13.png' },
  { name: 'Wine', img: '/ffsdb/images/image14.png' },
  { name: 'Vinegar', img: '/ffsdb/images/image15.png' },
  { name: 'Sour Soup', img: '/ffsdb/images/image16.png' },
  { name: 'Fermented tofu', img: '/ffsdb/images/image17.png' },
  { name: 'Yoghurt', img: '/ffsdb/images/image18.png' },
  { name: 'Bread', img: '/ffsdb/images/image19.png' },
  { name: 'Cheese', img: '/ffsdb/images/image20.png' },
  { name: 'Pickled cabbage', img: '/ffsdb/images/image21.png' },
  { name: 'Ham', img: '/ffsdb/images/image22.png' },
  { name: 'Fermented chilli paste', img: '/ffsdb/images/image23.png' },
  { name: 'Soy sauce', img: '/ffsdb/images/image24.png' },
  { name: 'Rice wine', img: '/ffsdb/images/image25.png' },
  { name: 'Fermented black beans', img: '/ffsdb/images/image26.png' },
  { name: 'Fermented tea', img: '/ffsdb/images/image27.png' },
])

const bacteria = ref([
  { name: 'Propioni bacterium', img: '/ffsdb/images/image83.jpeg' },
  { name: 'Pediococcus Claussen', img: '/ffsdb/images/image75.jpeg' },
  { name: 'Bifidobacterium bifidum', img: '/ffsdb/images/image74.jpeg' },
  { name: 'Lactobacillus casei', img: '/ffsdb/images/image76.jpeg' },
  { name: 'Lactobacillus Plantarum', img: '/ffsdb/images/image77.png' },
  { name: 'Bacillus', img: '/ffsdb/images/image78.jpeg' },
  { name: 'Acetobacter', img: '/ffsdb/images/image79.jpeg' },
  { name: 'Lactobacillus acidophilus', img: '/ffsdb/images/image80.png' },
  { name: 'Leuconostoc mesenteroides', img: '/ffsdb/images/image81.jpeg' },
  { name: 'Streptococcus thermophilus', img: '/ffsdb/images/image82.jpeg' },
  { name: 'Brevibacterium flavum', img: '/ffsdb/images/image84.jpeg' },
  { name: 'Lactobacillus delbrueckii', img: '/ffsdb/images/image85.jpeg' },
  { name: 'Lacticaseibacillus paracasei', img: '/ffsdb/images/image87.jpeg' },
  { name: 'Lactobacillus rhamnosus', img: '/ffsdb/images/image88.jpeg' },
  { name: 'Lactobacillus sakei', img: '/ffsdb/images/image86.jpeg' }
])

const fungi = ref([
  { name: 'Hansenula', img: '/ffsdb/images/image92.png' },
  { name: 'Saccharomyces rouxii', img: '/ffsdb/images/image91.jpeg' },
  { name: 'Saccharomyces cerevisiae', img: '/ffsdb/images/image93.jpeg' },
  { name: 'Candida', img: '/ffsdb/images/image94.jpeg' },
  { name: 'Pichia', img: '/ffsdb/images/image100.jpeg' },
  { name: 'Zygosaccharomyces', img: '/ffsdb/images/image102.png' },
  { name: 'Rhizopus', img: '/ffsdb/images/image96.jpeg' },
  { name: 'Mucor', img: '/ffsdb/images/image97.jpeg' },
  { name: 'Aspergillus niger', img: '/ffsdb/images/image98.jpeg' },
  { name: 'Neurospora', img: '/ffsdb/images/image99.jpeg' },
  { name: 'Aspergillus oryzae', img: '/ffsdb/images/image101.jpeg' },
  { name: 'Penicillium', img: '/ffsdb/images/image95.jpeg' },
  { name: 'Monascus', img: '/ffsdb/images/image103.png' },
  { name: 'Mucor rouxii', img: '/ffsdb/images/image104.png' },
  { name: 'Rhizopus oryzae', img: '/ffsdb/images/image105.png' }
])

const currentList = computed(() => {
  if (activeSection.value === 'bacteria') return bacteria.value
  if (activeSection.value === 'fungi') return fungi.value
  return fermentedFoods.value
})

const pageList = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (cur > 3) pages.push('...')
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i)
    if (cur < total - 2) pages.push('...')
    pages.push(total)
  }
  return pages
})

function changePage(p: number) {
  if (p < 1 || p > totalPages.value || p === currentPage.value) return
  currentPage.value = p
}

async function loadFoods(page = 1) {
  try {
    const data = await getFermentedFoods(page)
    if (data?.data) fermentedFoods.value = data.data
    if (data?.total) totalPages.value = Math.ceil(data.total / 15)
  } catch {}
}

async function loadSpecies() {
  try {
    const [b, f] = await Promise.all([getBacteria(), getFungi()])
    if (Array.isArray(b) && b.length > 0 && typeof b[0] !== 'string') {
      bacteria.value = b
    }
    if (Array.isArray(f) && f.length > 0 && typeof f[0] !== 'string') {
      fungi.value = f
    }
  } catch {}
}


watch(() => route.query.section, (sec) => {
  if (sec) {
    if (sec === 'pathway') {
      openPanel.value = 'second'
    } else if (sec === 'region') {
      openPanel.value = 'second'
    } else {
      openPanel.value = 'species'
      activeSection.value = sec as string
      currentPage.value = 1
    }
    
    nextTick(() => {
      const el = document.getElementById(activeSection.value)
      if (el) {
        window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
      }
    })
  }
}, { immediate: true })



// 改为在用户展开面板时加载
function toggle(panel: string) {
  openPanel.value = openPanel.value === panel ? '' : panel
  
  // ✅ 展开时才加载数据
  if (openPanel.value === 'species') {
    if (activeSection.value === 'food') {
      loadFoods(currentPage.value)
    } else {
      loadSpecies()
    }
  }
}


</script>

<style scoped>
.browse {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}

/* Accordion */
.accordion {
  margin-bottom: 1.5rem;
}

.accordion-header {
  background-color: var(--red);
  color: #fff;
  padding: 1.2rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: background 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.accordion-header:hover {
  background-color: var(--maroon);
}

.accordion-header .icon {
  font-size: 0.9rem;
}

.accordion-content {
  background: transparent;
  padding: 2rem 0;
}

.sub-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--maroon);
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.sub-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--maroon);
}

/* Food Grid */
.food-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.food-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #e8d8d0;
  box-shadow: 0 2px 8px rgba(93,24,13,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}
.food-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(93,24,13,0.14); }

.food-img-wrap { position: relative; overflow: hidden; aspect-ratio: 1; }
.food-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
.food-card:hover .food-img { transform: scale(1.08); }
.food-overlay {
  position: absolute; inset: 0;
  background: rgba(93,24,13,0.55);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 0.9rem;
  opacity: 0; transition: opacity 0.2s;
}
.food-card:hover .food-overlay { opacity: 1; }
.food-name {
  padding: 0.6rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--dark);
  text-align: center;
}

/* Pagination */
.pagination {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  margin-top: 1rem;
}
.pagination button {
  width: 36px; height: 36px;
  border: 1px solid #ddc9bf;
  border-radius: 6px;
  background: #fff;
  color: var(--dark);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.pagination button:hover, .pagination button.active {
  background: var(--maroon);
  color: #fff;
  border-color: var(--maroon);
}
.pagination span { display: inline-flex; align-items: center; }
.pg-ellipsis { line-height: 36px; color: #aaa; padding: 0 0.3rem; }
.pg-arrow { min-width: 36px; font-size: 1.2rem; }
.pg-arrow:disabled { opacity: 0.3; cursor: not-allowed; background: #fff; color: #aaa; border-color: #e8d8d0; }

.species-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}
.species-list { display: flex; flex-direction: column; gap: 0.4rem; }
.species-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #e8d8d0;
  transition: all 0.2s;
}
.species-item:hover { border-color: var(--maroon); color: var(--maroon); transform: translateX(4px); }
.species-name { font-size: 0.95rem; font-weight: 600; }
.species-arrow { color: #ccc; font-size: 1.2rem; }
.species-item:hover .species-arrow { color: var(--maroon); }

/* Region */
.region-section { text-align: center; padding: 2rem; }
.placeholder-img { max-width: 100%; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }

@media (max-width: 900px) {
  .food-grid { grid-template-columns: repeat(3, 1fr); }
  .species-grid { grid-template-columns: 1fr; }
}
</style>
