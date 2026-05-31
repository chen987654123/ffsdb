<template>
  <div class="app-container">
    <div class="header-banner">
      <div class="logo-area">
        <div class="logo-icon">&#x1F9EA;</div>
        <div class="logo-text">
          <div class="first-line"><i>Food Fermentation Strain Database</i></div>
          <div class="second-line">&mdash; A research platform for food fermentation microorganisms</div>
        </div>
      </div>
    </div>
    <header class="top-bar">
      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <div class="dropdown">
          <router-link to="/browse" class="dropbtn">Browse &#x25BC;</router-link>
          <div class="dropdown-content">
            <router-link to="/browse?section=food">Fermented foods</router-link>
            <router-link to="/browse?section=bacteria">Bacteria</router-link>
            <router-link to="/browse?section=fungi">Fungi</router-link>
          </div>
        </div>
        <div class="dropdown">
          <router-link to="/server" class="dropbtn">Server &#x25BC;</router-link>
          <div class="dropdown-content">
            <router-link to="/server?tool=strain">Prediction of superior microbial strains</router-link>
            <router-link to="/server?tool=flavour">Prediction of flavour compounds</router-link>
            <router-link to="/server?tool=synergistic">Prediction of synergistic fermentation effects</router-link>
            <router-link to="/server?tool=community">Prediction of synthetic microbial community formula</router-link>
            <router-link to="/server?tool=protein">Prediction of protein functions</router-link>
          </div>
        </div>
        <router-link to="/download">Download</router-link>
        <router-link to="/help">Help</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
:root {
  --maroon: #5D180D;
  --red: #A71F2B;
  --cream: #F9F2EE;
  --cream2: #F7ECE6;
  --dark: #363732;
  --gold: #FFC000;
  --teal: #63868C;
  --purple: #A691B2;
  --green: #B3C39E;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background: var(--cream);
  color: var(--dark);
  line-height: 1.6;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-banner {
  position: relative;
  background: url('src/assets/images/image1.png') no-repeat right center;
  background-size: auto 100%;
  padding: 1rem 4%;
  border-bottom: 2px solid var(--cream2);
}

.header-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 225, 229, 0.3);
  z-index: 1;
}

.logo-area {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.logo-icon {
  font-size: 3.5rem;
  color: var(--dark);
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.logo-ffsdb {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--maroon);
  letter-spacing: 2px;
}

.first-line {
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 700;
  color: var(--maroon);
}

.second-line {
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 500;
  color: var(--maroon);
  text-align: right;
  margin-left: 2rem;
}

.top-bar {
  display: flex;
  align-items: center;
  padding: 0 4%;
  background: var(--red);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-links > a, .dropbtn {
  text-decoration: none;
  color: rgba(255,255,255,0.95);
  font-weight: 600;
  font-size: 1.05rem;
  padding: 1rem 0;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  display: block;
}

.nav-links > a:hover,
.nav-links > a.router-link-active,
.dropdown:hover .dropbtn {
  color: #fff;
  border-bottom-color: var(--gold);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.15);
  z-index: 10;
  border: 1px solid #eee;
  border-radius: 4px;
}

.dropdown-content a {
  color: var(--dark);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background 0.2s;
  white-space: nowrap;
}

.dropdown-content a:hover {
  background-color: var(--cream2);
  color: var(--maroon);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.main-content {
  flex: 1;
  padding: 0;
}
</style>
