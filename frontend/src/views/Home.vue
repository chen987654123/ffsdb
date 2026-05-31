<template>
  <div class="home">
    <div class="home-container">
      
      <!-- Top Search Banner -->
      <div class="top-search-banner">
        <div class="search-input-wrapper">
          <input type="text" v-model="searchQuery" placeholder="NCBI gene ID/ gene name" class="top-search-input" />
          <button class="top-search-btn" @click="handleSearch">
            <svg class="search-icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="white">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            Search
          </button>
        </div>
        <div class="search-footer">
          <div class="search-examples">Examples: steamed bun/Bacillus</div>
          <div class="search-advanced">Advanced Search</div>
        </div>
      </div>

      <!-- About Section -->
      <div class="about-section">
        <h2 class="about-title">What is FFSDB?</h2>
        <p class="about-text">
          The <i>Food Fermentation Strain Database(FFSDB)</i> is specifically designed for food fermentation researchers,
          featuring a user-friendly interface and a high-performance framework. It collates gene sequences, protein
          structures, and homology information from databases including NCBI, UniProt, ENA, and EMBL. Primary
          categories encompass types of fermented foods and associated microbial strains. This convenient web interface
          facilitates enhanced utilisation of strains relevant to fermented foods. FFSDB will serve as a valuable resource for
          fermented food research, assisting scientists in elucidating the molecular mechanisms underlying microbial
          fermentation processes.
        </p>
      </div>

      <!-- Welcome Section -->
      <div class="welcome-outer">
        <div class="welcome-box">
          <div class="nav-arrow left-arrow">&#10094;</div>
          <div class="nav-arrow right-arrow">&#10095;</div>
          <h2 class="welcome-title">WELCOME TO FFSDB</h2>
          <div class="welcome-content">
            <img src="../assets/cuts/1.png" alt="Architecture Diagram" class="arch-img" />
          </div>
          <div class="carousel-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid-section">
        <div class="stat-colored-box" style="background-color: #a48cb3;">
          <div class="stat-num">605</div>
          <div class="stat-name">Fermented<br/>foods</div>
        </div>
        <div class="stat-colored-box" style="background-color: #c4caca;">
          <div class="stat-num">1286</div>
          <div class="stat-name">Bacteria</div>
        </div>
        <div class="stat-colored-box" style="background-color: #558e91;">
          <div class="stat-num">342</div>
          <div class="stat-name">Fungi</div>
        </div>
        <div class="stat-colored-box" style="background-color: #c66e13;">
          <div class="stat-num">897</div>
          <div class="stat-name">Flavour<br/>Compounds</div>
        </div>
        <div class="stat-colored-box" style="background-color: #fcbd60;">
          <div class="stat-num">56421</div>
          <div class="stat-name">Gene<br/>Sequence</div>
        </div>
        <div class="stat-colored-box" style="background-color: #9cbca0;">
          <div class="stat-num">41739</div>
          <div class="stat-name">Protein</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { globalSearch } from '../api/index'

const router = useRouter()
const searchQuery = ref('')

async function handleSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  try {
    await globalSearch(q)
  } catch {}
  router.push({ path: '/browse', query: { q } })
}
</script>

<style scoped>
.home {
  padding: 2rem 1rem 4rem;
  background: #fff;
}
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.top-search-banner {
  padding: 0;
}
.search-input-wrapper {
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #aaa;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
}
.top-search-input {
  flex: 1;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  border: none;
  outline: none;
  color: #333;
}
.top-search-input::placeholder { color: #aaa; }
.top-search-btn {
  background: #c00;
  color: #fff;
  border: none;
  padding: 0 1.5rem;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.search-icon-svg { margin-right: 4px; }
.search-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.85rem;
}
.search-examples { color: #333; }
.search-advanced { color: #c00; cursor: pointer; }

.about-section {
  background: #f2f2f2;
  padding: 1.5rem 2rem;
  border-radius: 4px;
}
.about-title {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 1rem;
}
.about-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #222;
  text-align: justify;
}
.about-text i { font-weight: 600; color: #5b1a13; }

.welcome-outer {
  background: #fdf5f2;
  padding: 1.5rem 1rem 1.2rem;
  border-radius: 4px;
}
.welcome-box {
  border: 2px dashed #444;
  padding: 2rem 1.5rem;
  position: relative;
}
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3.5rem;
  color: #5b1a13;
  cursor: pointer;
  user-select: none;
  font-weight: 900;
  background: #fdf5f2;
  padding: 10px 0;
  line-height: 1;
}
.left-arrow { left: -18px; }
.right-arrow { right: -18px; }

.welcome-title {
  text-align: center;
  color: #5b1a13;
  font-weight: 800;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}
.welcome-content {
  display: flex;
  justify-content: center;
}
.arch-img {
  max-width: 100%;
  height: auto;
  max-height: 380px;
  object-fit: contain;
}
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #333;
  display: inline-block;
  cursor: pointer;
  background: transparent;
}
.dot.active {
  background: #5b1a13;
  border-color: #5b1a13;
}

.stats-grid-section {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
}
.stat-colored-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.8rem 0.5rem;
  color: #fff;
  border-radius: 2px;
  text-align: center;
  height: 100%;
}
.stat-num {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}
.stat-name {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.3;
}

@media (max-width: 900px) {
  .stats-grid-section { grid-template-columns: repeat(3, 1fr); }
  .welcome-outer { padding: 1rem; }
}
@media (max-width: 600px) {
  .stats-grid-section { grid-template-columns: repeat(2, 1fr); }
}
</style>
