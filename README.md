
<div align="center">

# 🧬 FFSDB — Food Fermentation Strain Database

[![Website](https://img.shields.io/badge/Website-Online-green?style=flat-square&logo=github)](https://chen987654123.github.io/ffsdb/)
[![Platform](https://img.shields.io/badge/Platform-Web-blue?style=flat-square)](https://chen987654123.github.io/ffsdb/)
[![Subject](https://img.shields.io/badge/Subject-Food%20Fermentation-orange?style=flat-square)](https://chen987654123.github.io/ffsdb/)

**A research platform for food fermentation microorganisms**

[🌐 Live Demo](https://chen987654123.github.io/ffsdb/) · [📧 Contact](#contact)

</div>



## 📝 Introduction

**FFSDB (Food Fermentation Strain Database)** is a specialized research platform dedicated to food fermentation microorganisms. It integrates gene sequences, protein structures, and homology information from authoritative databases including **NCBI**, **UniProt**, **ENA**, and **EMBL**.

The platform provides a user-friendly interface and high-performance framework, covering primary categories of fermented foods and associated microbial strains. FFSDB serves as a valuable resource for fermented food research, assisting scientists in elucidating the molecular mechanisms underlying microbial fermentation processes.

> **Live Site:** [https://chen987654123.github.io/ffsdb/](https://chen987654123.github.io/ffsdb/)

---

## ✨ Features

### 🔍 Browse & Search
- **Fermented Foods** — Browse by category or region (e.g., Sour Soup, Soy Sauce, Wine, Yogurt, Kimchi)
- **Bacteria** — Systematic catalog of bacterial strains with classification, morphology, and safety data
- **Fungi** — Comprehensive fungal strain database including yeasts and molds
- **Advanced Search** — Query by NCBI gene ID, gene name, or strain name

### 🤖 Five Core Prediction Servers

| Server | Description |
|--------|-------------|
| **Server 1** | **Prediction of Superior Microbial Strains** — Evaluate strain excellence scores, substrate utilization, stress tolerance, and safety profiles |
| **Server 2** | **Prediction of Flavour Compounds** — Predict lactic acid, acetic acid, esters, and other flavor metabolites |
| **Server 3** | **Prediction of Synergistic Fermentation Effects** — Analyze compatibility and synergy between two microbial strains |
| **Server 4** | **Prediction of Synthetic Microbial Community Formula** — Design microbial consortia based on flavor profiles and fermentation performance |
| **Server 5** | **Prediction of Protein Functions** — Annotate metabolic, enzymatic, transport, and virulence-related functions |

### 📥 Data Download
- Download complete datasets for all five prediction models
- Integrated external resources: NCBI Genome, gutMGene, MASI, webMGA

### 📚 Help & Documentation
- Detailed usage guides for each prediction module
- Curated knowledge base connecting fermented foods with their microbial ecology

---

## 📊 Database Statistics

<div align="center">

| Category | Count |
|:---------|------:|
| 🧬 Gene Sequences | 56,421 |
| 🧪 Proteins | 41,739 |
| 🍞 Fermented Foods | 605 |
| 🦠 Bacteria | 1,286 |
| 🍄 Fungi | 342 |
| 🌸 Flavour Compounds | 897 |

</div>

---

## 🛠 Technology Stack

- **Frontend**: HTML5 / CSS3 / JavaScript
- **Deployment**: GitHub Pages
- **Data Sources**: NCBI, UniProt, ENA, EMBL
- **Algorithms**: Scientific prediction models for strain evaluation and functional annotation

---

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection for accessing external database resources

### Local Development

```bash
# Clone the repository
git clone https://github.com/chen987654123/ffsdb.git

# Navigate to project directory
cd ffsdb

# If using a local server (recommended for full functionality)
# Python 3
python -m http.server 8000

# Or Node.js
npx serve .

# Open in browser
# http://localhost:8000
```

> **Note**: Since the site is deployed on GitHub Pages, you can also visit it directly without any local setup.

---

## 📁 Project Structure

```
ffsdb/
├── index.html              # Main entry / Home page
├── browse.html             # Browse fermented foods & strains
├── bacteria.html           # Bacteria catalog
├── fungi.html              # Fungi catalog
├── prediction/             # Prediction server pages
│   ├── superior_strain.html
│   ├── flavour.html
│   ├── synergy.html
│   ├── community.html
│   └── protein.html
├── download.html           # Data download center
├── help.html               # Help documentation
├── contact.html            # Contact page
├── assets/
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript modules
│   └── images/             # Figures and icons
└── data/                   # Static datasets (if applicable)
```

---

## 📖 Usage Guide

### 1. Browse Fermented Foods
Navigate to **Browse → Fermented Foods** to explore foods by:
- **Species**: Wine, Vinegar, Sour Soup, Fermented Tofu, Soy Sauce, etc.
- **Region**: Geographic distribution of traditional fermented foods

Each food entry includes:
- Associated microbial strains (lactic acid bacteria, yeast, etc.)
- Ingredients and nutritional components
- Fermentation process description
- Functional benefits

### 2. Strain Information
Access detailed strain profiles including:
- **Morphology** (e.g., short rod-shaped, ovoid)
- **Taxonomic Classification** (Kingdom → Species)
- **Physiological & Biochemical Characteristics**
- **Safety Status** (GRAS recognition by FAO/WHO)
- **Core Fermentation Functions**
- **Associated Fermented Foods**

### 3. Prediction Servers

#### Superior Strain Prediction
- Input: FASTA sequence(s) or file upload
- Output: Excellence score, substrate utilization, product potential, stress tolerance, safety assessment, and core functional genes

#### Flavour Compound Prediction
- Input: Strain name or FASTA sequence
- Output: Predicted flavour compounds (lactic acid, acetic acid, esters, etc.) with confidence levels

#### Synergistic Fermentation
- Input: FASTA sequences for Strain 1 and Strain 2
- Output: Compatibility analysis and synergy confidence score

#### Synthetic Community Formula
- Input: Keywords for flavor profile, fermentation performance, and target food
- Output: Recommended strain combinations with confidence levels

#### Protein Function Prediction
- Input: Protein FASTA sequence, strain name, or NCBI ID
- Output: Functional description, EC number, GO annotation, and fermentation-related tags

---

## 👥 Team & Contact

**Team Name**: Sour Soup Frontier Lab  
**PI**: Na Liu  
**Affiliation**: School of Liquor and Food Engineering, Guizhou University, China  
**Address**: SSF Lab, Guizhou University, China  
**Office Hours**: Monday to Friday, 9:00 AM – 5:00 PM  
**Response Time**: 1–3 working days  
**Email**: name@example.com *(please update with actual contact email)*

For questions, comments, or suggestions about the website, please feel free to contact us or open an issue in this repository.

---

## 🙏 Acknowledgements

We gratefully acknowledge the data sources that make FFSDB possible:
- [NCBI](https://www.ncbi.nlm.nih.gov/)
- [UniProt](https://www.uniprot.org/)
- [ENA](https://www.ebi.ac.uk/ena/)
- [EMBL](https://www.embl.org/)

---

<div align="center">

**⭐ Star this repository if you find it helpful for your research!**

</div>
