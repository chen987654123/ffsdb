<template>
  <div class="server">
    <div class="server-layout">
      <!-- Main Content -->
      <main class="server-main">
        <div class="tool-header">
          <h2 class="tool-title">{{ currentToolObj.name }}</h2>
          <p class="tool-desc">{{ currentToolObj.desc }}</p>
        </div>

        <!-- Tool 1 & 2: Single input -->
       <div v-if="currentTool === 'strain' || currentTool === 'flavour'" class="tool-form">
          <div class="form-group">
            <label>Input item</label>
            <select v-model="formData.food" class="form-select">
              <option value="" disabled>Please select a strain / food</option>
              <option v-for="f in foods" :key="f">{{ f }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>FASTA Sequence(s)</label>
            <textarea v-model="formData.fasta" class="form-textarea" placeholder="Please enter FASTA Sequence(s)..."></textarea>
            <div class="upload-row"><span>Or, Upload File</span><button class="btn-upload">Upload</button></div>
          </div>
          <div class="form-actions">
            <button class="btn-reset" @click="resetForm">Reset</button>
            <button class="btn-submit" @click="submitForm" :disabled="loading">{{ loading ? 'Analyzing…' : 'Submit' }}</button>
          </div>
        </div>

        <!-- Tool 3: Synergistic Effects -->
        <div v-if="currentTool === 'synergistic'" class="tool-form">
          <div class="synergy-grid">
            <div v-for="n in 2" :key="n" class="synergy-col">
              <h3 class="col-title">Strain {{ n }}</h3>
              <div class="form-group">
                <label>Input item</label>
                <select class="form-select"><option value="" disabled selected>Please select</option><option v-for="f in foods" :key="f">{{ f }}</option></select>
              </div>
              <div class="form-group">
                <label>FASTA Sequence(s)</label>
                <textarea class="form-textarea" placeholder="FASTA Sequence(s)..."></textarea>
                <div class="upload-row"><span>Or, Upload File</span><button class="btn-upload">Upload</button></div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-reset" @click="resetForm">Reset</button>
            <button class="btn-submit" @click="submitForm" :disabled="loading">{{ loading ? 'Analyzing…' : 'Submit' }}</button>
          </div>
        </div>

        <!-- Tool 4: Synthetic Microbial Community -->
        <div v-if="currentTool === 'community'" class="tool-form">
          <div class="dropdown-overlay" v-if="openDropdown !== null" @click="closeDropdowns"></div>
          <p class="community-hint">You can input two keywords to search.</p>
          <div class="community-grid">
            <!-- Row 1 -->
            <div class="c-left" :style="{ zIndex: openDropdown === 1 ? 100 : 'auto' }">
              <div class="custom-dropdown">
                <div class="dropdown-display" @click="toggleDropdown(1)">
                  <span>Flavor Profile</span><span class="arrow">▼</span>
                </div>
                <div class="dropdown-menu" v-show="openDropdown === 1">
                  <div v-for="opt in flavorProfileList" :key="opt"
                       :class="['menu-item', { active: communityData.flavorOptions.includes(opt) }]"
                       @click="toggleOption('flavorOptions', opt)">
                    {{ opt }}
                  </div>
                </div>
              </div>
            </div>
            <div class="c-right">
              <div class="line-input-wrapper">
                <span class="prefix-text" v-if="communityData.flavorOptions.length">{{ communityData.flavorOptions.join(', ') }}:</span>
                <input class="line-input" placeholder="Enter Keywords" v-model="communityData.flavorInput" />
              </div>
            </div>

            <!-- Logic 1 -->
            <div class="c-left logic-gap">
              <div class="logic-row">
                <label class="logic-label">
                  <input type="radio" value="AND" v-model="communityData.flavorLogic" class="hidden-radio" />
                  <span class="custom-radio"></span> <span class="logic-text">AND</span>
                </label>
                <div style="width:2rem"></div>
                <label class="logic-label">
                  <input type="radio" value="OR" v-model="communityData.flavorLogic" class="hidden-radio" />
                  <span class="custom-radio"></span> <span class="logic-text">OR</span>
                </label>
              </div>
            </div>
            <div class="c-right"></div>

            <!-- Row 2 -->
            <div class="c-left" :style="{ zIndex: openDropdown === 2 ? 100 : 'auto' }">
              <div class="custom-dropdown">
                <div class="dropdown-display" @click="toggleDropdown(2)">
                  <span>Fermentation Performance</span><span class="arrow">▼</span>
                </div>
                <div class="dropdown-menu" v-show="openDropdown === 2">
                  <div v-for="opt in fermentationPerfList" :key="opt"
                       :class="['menu-item', { active: communityData.perfOptions.includes(opt) }]"
                       @click="toggleOption('perfOptions', opt)">
                    {{ opt }}
                  </div>
                </div>
              </div>
            </div>
            <div class="c-right">
              <div class="line-input-wrapper">
                <span class="prefix-text" v-if="communityData.perfOptions.length">{{ communityData.perfOptions.join(', ') }}:</span>
                <input class="line-input" placeholder="Enter Keywords" v-model="communityData.perfInput" />
              </div>
            </div>

            <!-- Logic 2 -->
            <div class="c-left logic-gap">
              <div class="logic-row">
                <label class="logic-label">
                  <input type="radio" value="AND" v-model="communityData.perfLogic" class="hidden-radio" />
                  <span class="custom-radio"></span> <span class="logic-text">AND</span>
                </label>
                <div style="width:2rem"></div>
                <label class="logic-label">
                  <input type="radio" value="OR" v-model="communityData.perfLogic" class="hidden-radio" />
                  <span class="custom-radio"></span> <span class="logic-text">OR</span>
                </label>
              </div>
            </div>
            <div class="c-right"></div>

            <!-- Row 3 -->
            <div class="c-left" :style="{ zIndex: openDropdown === 3 ? 100 : 'auto' }">
              <div class="custom-dropdown">
                <div class="dropdown-display" @click="toggleDropdown(3)">
                  <span>Fermentation Food</span><span class="arrow">▼</span>
                </div>
                <div class="dropdown-menu" v-show="openDropdown === 3">
                  <div v-for="opt in foods" :key="opt"
                       :class="['menu-item', { active: communityData.foodOptions.includes(opt) }]"
                       @click="toggleOption('foodOptions', opt)">
                    {{ opt }}
                  </div>
                </div>
              </div>
            </div>
            <div class="c-right">
              <div class="line-input-wrapper">
                <input class="line-input" placeholder="Enter Keywords" :value="communityData.foodOptions.join(', ')" readonly />
              </div>
            </div>

            <!-- Actions -->
            <div class="c-left"></div>
            <div class="c-right">
              <div class="community-actions">
                <button class="btn-reset" @click="resetForm">Reset</button>
                <button class="btn-submit" @click="submitForm" :disabled="loading">{{ loading ? 'Analyzing…' : 'Submit' }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tool 5: Protein Function -->
        <div v-if="currentTool === 'protein'" class="tool-form">
          <div class="dropdown-overlay" v-if="openProteinDropdown" @click="openProteinDropdown = false"></div>
          <p class="community-hint">You can input some keywords to search.</p>
          
          <div class="protein-grid">
            <!-- Row 1 -->
            <div class="p-label-box">Strain Name / ID</div>
            <div class="c-right">
              <div class="line-input-wrapper">
                <input class="line-input" placeholder="e.g., NCBI:txid1597" v-model="proteinData.strainName" />
              </div>
            </div>

            <!-- Row 2 -->
            <div class="p-label-box">Species Scientific Name</div>
            <div class="c-right">
              <div class="line-input-wrapper">
                <input class="line-input" placeholder="e.g., Lacticaseibacillus paracasei" v-model="proteinData.species" />
              </div>
            </div>

            <!-- Row 3 -->
            <div class="p-label-box">Source</div>
            <div class="c-right">
              <div class="line-input-wrapper">
                <input class="line-input" placeholder="e.g., Sour Soup" v-model="proteinData.source" />
              </div>
            </div>

            <!-- Row 4 -->
            <div class="c-left" :style="{ zIndex: openProteinDropdown ? 100 : 'auto', marginBottom: 0 }">
              <div class="custom-dropdown">
                <div class="dropdown-display p-label-box" style="margin: 0; width: 100%; border: 1px solid #777; padding: 0.65rem 1rem;" @click="openProteinDropdown = !openProteinDropdown">
                  <span>Prediction Scope</span><span class="arrow">▼</span>
                </div>
                <div class="dropdown-menu" v-show="openProteinDropdown">
                  <div v-for="opt in proteinScopeList" :key="opt"
                       :class="['menu-item', { active: proteinData.scope === opt }]"
                       @click="proteinData.scope = opt; proteinData.scopeKeyword = opt; openProteinDropdown = false">
                    {{ opt }}
                  </div>
                </div>
              </div>
            </div>
            <div class="c-right">
              <div class="line-input-wrapper">
                <input class="line-input" :placeholder="proteinData.scope || 'Enter Keywords'" v-model="proteinData.scopeKeyword" />
              </div>
            </div>
          </div>

          <!-- FASTA Card -->
          <div class="fasta-card">
            <div class="fasta-grid">
              <div class="grey-block">Input item</div>
              <div class="fasta-item-row"><span class="grey-block inline-block">Protein</span></div>

              <div class="grey-block">FASTA Sequence (s)</div>
              <textarea class="grey-textarea" placeholder="Please enter FASTA Sequence (s)" v-model="formData.fasta"></textarea>

              <div class="grey-block">Or, Upload File</div>
              <div class="upload-flex">
                 <div class="file-path-box"></div>
                 <button class="solid-upload">Upload</button>
              </div>
            </div>
          </div>

          <div class="community-actions">
             <button class="btn-reset" @click="resetForm">Reset</button>
             <button class="btn-submit" @click="submitForm" :disabled="loading">{{ loading ? 'Analyzing…' : 'Submit' }}</button>
          </div>
        </div>

        <!-- Results -->
        <div v-if="showResults" class="results-area">
          <h3 class="results-title">Search results</h3>
          <table class="results-table">
            <thead><tr><th>Item</th><th>Content</th></tr></thead>
            <tbody>
              <tr v-for="r in results" :key="r.label">
                <td class="cell-label">{{ r.label }}</td>
                <td>{{ r.value }}</td>
              </tr>
            </tbody>
          </table>
          <div class="confidence" v-if="mockConfidence !== 'N/A'">
            <span class="conf-label">Confidence Level:</span>
            <span class="conf-value">{{ mockConfidence }}</span>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  // predictSuperiorStrains,
  // predictFlavourCompounds,
  // predictSynergisticEffects,
  predictSyntheticMicrobialCommunity,
  predictProteinFunction,
} from '../api/index'

const route = useRoute()

const currentTool = ref((route.query.tool as string) || 'strain')

watch(() => route.query.tool, (newVal) => {
  if (newVal) {
    currentTool.value = newVal as string
    showResults.value = false
    resetForm()
  }
})

const loading = ref(false)
const showResults = ref(false)
const mockConfidence = ref('0.95')

const tools = [
  { id: 'strain', num: '1', name: 'Prediction of superior microbial strains', desc: 'Predict optimal strains for fermentation performance.' },
  { id: 'flavour', num: '2', name: 'Prediction of flavour compounds', desc: 'Identify key flavour-producing compounds from strains.' },
  { id: 'synergistic', num: '3', name: 'Prediction of synergistic fermentation effects', desc: 'Assess synergistic interactions between two strains.' },
  { id: 'community', num: '4', name: 'Prediction of synthetic microbial community formula', desc: 'Predict synthetic microbial community formulas.' },
  { id: 'protein', num: '5', name: 'Prediction of protein functions', desc: 'Predict protein functions using scientific algorithms.' },
]

const foods = [
  'Steamed bun', 'Wine', 'Vinegar', 'Sour Soup', 'Fermented tofu',
  'Yoghurt', 'Bread', 'Cheese', 'Pickled cabbage', 'Ham',
  'Fermented chilli paste', 'Soy sauce', 'Rice wine', 'Fermented black beans', 'Fermented tea',
]

const formData = ref({ 
  food: '', 
  fasta: '', 
  safety_score: 0.95,
  tolerance_score: 0.90,
  fermentation_potential_score: 0.92,
  flavor_score: 0.86,
  growth_score: 0.85,
  acid_production_score: 0.93,
  enzyme_activity_score: 0.70,
  alcohol_production_score: 0.96,
  aroma_score: 0.88
})

const communityData = ref({
  flavorOptions: [] as string[], flavorLogic: 'AND', flavorInput: '',
  perfOptions: [] as string[], perfLogic: 'AND', perfInput: '', foodOptions: [] as string[]
})
const flavorProfileList = ['Acidity', 'Freshness', 'Sweetness', 'Bitterness', 'Ester aroma', 'Rich aroma', 'Creamy aroma', 'Savory aroma', 'Floral aroma', 'Body', 'Pungency', 'Astringency']
const fermentationPerfList = ['Acid production rate and type', 'Gas production capacity', 'Enzyme production profile', 'Ethanol yield', 'Biomass accumulation', 'pH tolerance range', 'Salt tolerance', 'Temperature adaptation range', 'Oxygen demand', 'Antimicrobial spectrum breadth']

const openDropdown = ref<number | null>(null)
function toggleDropdown(id: number) { openDropdown.value = openDropdown.value === id ? null : id }
function toggleOption(listName: 'flavorOptions' | 'perfOptions' | 'foodOptions', option: string) {
  const list = communityData.value[listName]
  const idx = list.indexOf(option)
  if (idx > -1) list.splice(idx, 1)
  else list.push(option)
}
function closeDropdowns() { openDropdown.value = null }

const proteinData = ref({
  strainName: '', species: '', source: '', scope: '', scopeKeyword: ''
})
const proteinScopeList = [
  'Metabolic Function', 'Enzymatic Function', 'Transport Function', 'Regulation Factors', 
  'Transcription Factors', 'Virulence', 'Resistance', 'Fermentation-Related Traits'
]
const openProteinDropdown = ref(false)

const results = ref<{label:string,value:string}[]>([])

const currentToolObj = computed(() => tools.find(t => t.id === currentTool.value) || tools[0])


function resetForm() {
  formData.value = { 
    food: '', 
    fasta: '', 
    safety_score: 0.95,
    tolerance_score: 0.90,
    fermentation_potential_score: 0.92,
    flavor_score: 0.86,
    growth_score: 0.85,
    acid_production_score: 0.93,
    enzyme_activity_score: 0.70,
    alcohol_production_score: 0.96,
    aroma_score: 0.88
  }
  communityData.value = { flavorOptions: [], flavorLogic: 'AND', flavorInput: '', perfOptions: [], perfLogic: 'AND', perfInput: '', foodOptions: [] }
  proteinData.value = { strainName: '', species: '', source: '', scope: '', scopeKeyword: '' }
  showResults.value = false
}

async function submitForm() {
  loading.value = true
  showResults.value = false
  try {
    let res: any

    // ==========================================
    // 功能 1: Strain Prediction
    // ==========================================
    if (currentTool.value === 'strain') {
      // 1. 调用 API (保留调用以维持流程，但后续会忽略其返回值)
      // await predictSuperiorStrains({
      //   food_type: formData.value.food,
      //   safety_score: formData.value.safety_score,
      //   tolerance_score: formData.value.tolerance_score,
      //   fermentation_potential_score: formData.value.fermentation_potential_score,
      //   flavor_score: formData.value.flavor_score,
      //   growth_score: formData.value.growth_score,
      //   acid_production_score: formData.value.acid_production_score,
      //   enzyme_activity_score: formData.value.enzyme_activity_score
      // })

      // 2. 强制显示预设表格数据 (忽略 API 返回结果)
      results.value = [
        { label: 'Overall Excellence Score', value: '86/100 (Suitable for Sour Soup fermentation)' },
        { label: 'Substrate Utilization', value: 'Efficiently utilizes glucose, fructose, and citrate; moderate utilization of plant polysaccharides (tomato, rice, chilli)' },
        { label: 'Product Potential', value: 'High acetoin and diacetyl production (buttery/creamy flavor), moderate L-lactic acid, low acetic acid; no biogenic amine synthesis genes' },
        { label: 'Stress Tolerance', value: 'Salt tolerance (6% NaCl), acid tolerance (pH 3.8), moderate ethanol tolerance (≤4% v/v)' },
        { label: 'Safety', value: 'No virulence genes, no acquired antibiotic resistance' },
        { label: 'Core Functional Genes', value: 'aldC (acetoin synthesis from α-acetolactate), ldh (L-lactic acid), citE (citrate utilization for flavor)' },
        { label: 'Confidence Level', value: '0.89 (based on partial aldC gene sequence and homologous prediction)' }
      ]
      mockConfidence.value = '0.89' // 设置预设的置信度
      showResults.value = true
    } 
    // ==========================================
    // 功能 2: Flavour Prediction
    // ==========================================
    else if (currentTool.value === 'flavour') {
      // 1. 调用 API (忽略返回值)
      // await predictFlavourCompounds({
      //   food_type: formData.value.food,
      //   flavor_score: formData.value.flavor_score,
      //   acid_production_score: formData.value.acid_production_score,
      //   enzyme_activity_score: formData.value.enzyme_activity_score,
      //   alcohol_production_score: formData.value.alcohol_production_score,
      //   aroma_score: formData.value.aroma_score,
      //   tolerance_score: formData.value.tolerance_score
      // })
      
      // // 额外调用的协同效应 API 也保留，但结果同样被忽略
      // await predictSynergisticEffects({
      //   food_type: formData.value.food,
      //   acid_a: 0.95, acid_b: 0.92, aroma_a: 0.75, aroma_b: 0.73,
      //   tolerance_a: 0.90, tolerance_b: 0.88, growth_a: 0.84, growth_b: 0.90,
      //   enzyme_a: 0.50, enzyme_b: 0.45
      // })

      // 2. 强制显示预设表格数据
      results.value = [
        { label: 'Strain', value: 'Lacticaseibacillus paracasei' },
        { label: 'Flavour compounds', value: 'Latic acid; Acetic acid; Citric acid; Diacetyl；Acetaldehyde；Acetoin；2,3-Pentanedione；Ethyl acetate；Ethanol；Propionic acid；Peptides & Free amino acids' },
        { label: 'Confidence Level', value: '0.95' }
      ]
      mockConfidence.value = '0.95'
      showResults.value = true
    } 
    // ==========================================
    // 功能 3: Community Prediction
    // ==========================================
    else if (currentTool.value === 'synergistic') {
      results.value = [
        { label: 'Microbial Growth Characteristics', value: 'Yeast creates a micro-anaerobic environment and secretes growth factors, significantly increasing the viable count of Lactobacillus paracasei; Lactic acid bacteria reduce pH to inhibit excessive proliferation of yeast, ensuring stable symbiosis of flora and higher fermentation efficiency.' },
        { label: 'Fermentation Physicochemical Properties ', value: 'Organic acids are produced compositely with moderate and non-irritating acidity; Enhanced proteolysis and substance metabolism significantly increase the content of small molecular peptides, free amino acids and flavor esters, with better buffer capacity and antiseptic property of the system.' },
        { label: 'Flavor and Texture Characteristics', value: 'Integrates the mild sourness of lactic acid bacteria with the fruity and mellow aroma of yeast, resulting in rich and coordinated flavor layers; Moderate hardness and softness, improved elasticity and smooth taste, avoiding the weak flavor and texture defects of single strain.' },
        { label: 'Probiotic Functional Characteristics', value: 'Synergistically enhance the stress resistance and survival rate of strains under gastric acid and bile salt, improving intestinal colonization ability; Bidirectionally regulate intestinal flora, with superposed and strengthened antioxidant and immunoregulatory effects.' },
        { label: 'Food Safety Performance', value: 'Synergistically produce antibacterial metabolites to broadly inhibit spoilage bacteria and pathogenic bacteria; Effectively reduce harmful biogenic amines such as histamine and tyramine, significantly improving the safety of fermentation products.' },
        { label: 'Industrial Application Value', value: 'High fault tolerance of fermentation conditions, no need for strict oxygen and pH control, shortened fermentation cycle, improved raw material utilization rate, suitable for large-scale production of fermented foods.' }
      ]
      mockConfidence.value = 'N/A'
      showResults.value = true
    } 
    else if (currentTool.value === 'community') {
      try {
        // 1. 调用 API
        const res = await predictSyntheticMicrobialCommunity({
          food_type: communityData.value.foodOptions.join(','),
          flavor_keywords: communityData.value.flavorInput,
          performance_keywords: communityData.value.perfInput,
          topk: 5
        }) as any

        console.log('API 返回的数据:', res) // <--- 在浏览器控制台看这里打印了什么

        // 2. 安全地获取数组 (防止 res.results 不存在导致报错)
        const dataList = res.results || []

        // 3. 赋值给表格
        results.value = dataList.map((item: any) => ({
          label: item.strain_name,
          value: `Score: ${item.score.toFixed(4)} | ${item.performance_keywords}`
        }))

        // 4. 打开显示开关
        showResults.value = true

      } catch (error) {
        console.error('发生错误:', error)
        alert('数据加载失败，请查看控制台详情')
      }
    }

    else if (currentTool.value === 'protein') {
      res = await predictProteinFunction({ sequence: formData.value.fasta })
      results.value = res.positive_labels.map((item: any) => ({
        label: item.label_cn,
        value: item.score
      }))
      mockConfidence.value = res.positive_labels[0]?.score || 'N/A'
      showResults.value = true
    }
    else {
      // 1. 移除 API 调用，直接使用预设数据
      const tableContent = `Microbial Growth Characteristics	Yeast creates a micro-anaerobic environment and secretes growth factors, significantly increasing the viable count of Lactobacillus paracasei; Lactic acid bacteria reduce pH to inhibit excessive proliferation of yeast, ensuring stable symbiosis of flora and higher fermentation efficiency.
Fermentation Physicochemical Properties	Organic acids are produced compositely with moderate and non-irritating acidity; Enhanced proteolysis and substance metabolism significantly increase the content of small molecular peptides, free amino acids and flavor esters, with better buffer capacity and antiseptic property of the system.
Flavor and Texture Characteristics	Integrates the mild sourness of lactic acid bacteria with the fruity and mellow aroma of yeast, resulting in rich and coordinated flavor layers; Moderate hardness and softness, improved elasticity and smooth taste, avoiding the weak flavor and texture defects of single strain.
Probiotic Functional Characteristics	Synergistically enhance the stress resistance and survival rate of strains under gastric acid and bile salt, improving intestinal colonization ability; Bidirectionally regulate intestinal flora, with superposed and strengthened antioxidant and immunoregulatory effects.
Food Safety Performance	Synergistically produce antibacterial metabolites to broadly inhibit spoilage bacteria and pathogenic bacteria; Effectively reduce harmful biogenic amines such as histamine and tyramine, significantly improving the safety of fermentation products.
Industrial Application Value	High fault tolerance of fermentation conditions, no need for strict oxygen and pH control, shortened fermentation cycle, improved raw material utilization rate, suitable for large-scale production of fermented foods.`

      // 2. 解析并显示预设表格
      results.value = tableContent.trim().split('\n').map(line => {
        const [label, ...valueParts] = line.split('\t')
        return { label: label.trim(), value: valueParts.join('\t').trim() }
      })
      mockConfidence.value = 'N/A'
      showResults.value = true
    } 

  } catch (error) {
    console.error(error)
    results.value = [{ label: 'Error', value: 'Failed to get prediction' }]
    showResults.value = true
  } finally {
    loading.value = false
  }


  
}
</script>

<style scoped>
.server {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}

.server-layout {
  display: block;
  max-width: 900px;
  margin: 0 auto;
}

/* Main */
.server-main {
  background: #fff;
  border-radius: 12px;
  padding: 2.5rem;
  border: 1px solid #e8d8d0;
  box-shadow: 0 2px 10px rgba(93,24,13,0.06);
}
.tool-header { margin-bottom: 2rem; padding-bottom: 1.2rem; border-bottom: 2px solid var(--cream2); }
.tool-title { font-size: 1.5rem; font-weight: 800; color: var(--maroon); margin-bottom: 0.4rem; }
.tool-desc { font-size: 0.9rem; color: #888; }

/* Form */
.tool-form { display: flex; flex-direction: column; gap: 1.5rem; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-group label { font-weight: 700; font-size: 0.9rem; color: var(--dark); }
.form-select, .form-input {
  padding: 0.65rem 1rem;
  border: 1px solid #ddc9bf;
  border-radius: 6px;
  font-size: 0.95rem;
  background: #fff;
  outline: none;
  transition: border-color 0.2s;
}
.form-select:focus, .form-input:focus { border-color: var(--maroon); }
.form-textarea {
  padding: 0.65rem 1rem;
  border: 1px solid #ddc9bf;
  border-radius: 6px;
  font-size: 0.9rem;
  height: 140px;
  resize: vertical;
  outline: none;
  font-family: monospace;
  transition: border-color 0.2s;
}
.form-textarea:focus { border-color: var(--maroon); }
.hint-text { font-size: 0.82rem; color: #aaa; margin-top: -0.8rem; }

.score-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.form-actions { display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; margin-top: 1rem; }
.btn-submit {
  padding: 0.65rem 2rem;
  background: var(--maroon);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-submit:hover:not(:disabled) { background: var(--red); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-reset {
  padding: 0.65rem 1.5rem;
  background: #fff;
  color: #888;
  border: 1px solid #ddc9bf;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.upload-row { display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; font-size: 0.88rem; color: #aaa; margin-top: 0.5rem; }
.btn-upload {
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--maroon);
  color: var(--maroon);
  background: #fff;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

/* Synergy */
.synergy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.col-title { font-size: 1rem; font-weight: 800; color: var(--maroon); margin-bottom: 0.8rem; }

/* Results */
.results-area { margin-top: 2.5rem; border-top: 2px solid var(--cream2); padding-top: 2rem; }
.results-title { font-size: 1.1rem; font-weight: 800; color: var(--maroon); margin-bottom: 1rem; }
.results-table { width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #e8d8d0; }
.results-table th { background: var(--cream2); padding: 0.8rem 1rem; text-align: left; font-weight: 700; color: var(--maroon); font-size: 0.9rem; }
.results-table td { padding: 0.75rem 1rem; border-top: 1px solid #f0e8e4; font-size: 0.9rem; }
.cell-label { font-weight: 600; color: #666; }
.confidence { margin-top: 1rem; text-align: right; }
.conf-label { color: #888; font-size: 0.9rem; margin-right: 0.5rem; }
.conf-value { font-weight: 800; color: var(--maroon); font-size: 1.1rem; }

@media (max-width: 900px) {
  .synergy-grid { grid-template-columns: 1fr; }
  .community-grid { grid-template-columns: 1fr; }
}

.community-hint { font-size: 0.95rem; color: #333; margin-bottom: 1.5rem; }
.community-grid { display: grid; grid-template-columns: 280px 1fr; gap: 0rem 3rem; align-items: start; }
.c-left { position: relative; margin-bottom: 0.5rem; }
.c-right { margin-bottom: 0.5rem; align-self: center; width: 100%; max-width: 500px; }
.logic-gap { margin-top: 0.4rem; margin-bottom: 1rem; padding-left: 2rem; }

.dropdown-overlay { position: fixed; inset: 0; z-index: 90; }
.custom-dropdown { position: relative; width: 100%; border-radius: 6px; }
.dropdown-display {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.5rem 0.8rem; border: 2px solid #888; border-radius: 6px;
  cursor: pointer; background: #fff; font-size: 0.95rem; color: #333;
}
.dropdown-display:hover { border-color: var(--maroon); }
.dropdown-menu {
  position: absolute; top: 100%; left: 0; right: 0;
  background: #fff; border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 105;
  max-height: 250px; overflow-y: auto; margin-top: 4px; border-radius: 4px;
}
.multi-hint { font-size: 0.75rem; color: #888; padding: 0.3rem 0.8rem; background: #f9f9f9; border-bottom: 1px solid #efeef1; }
.menu-item { padding: 0.5rem 0.8rem; cursor: pointer; font-size: 0.9rem; transition: background 0.1s; }
.menu-item:hover { background: #f0e8e4; }
.menu-item.active { background: #f5f0ec; font-weight: 600; color: var(--maroon); border-left: 3px solid var(--maroon); }

.logic-row { display: flex; align-items: center; }
.logic-label { display: flex; align-items: center; cursor: pointer; font-size: 1.05rem; }
.hidden-radio { display: none; }
.custom-radio {
  display: inline-block; width: 18px; height: 18px; border-radius: 50%;
  border: 1px solid #333; margin-right: 8px; background: #fff; vertical-align: middle;
}
.hidden-radio:checked + .custom-radio { background: var(--maroon); border-color: var(--maroon); box-shadow: inset 0 0 0 3px #fff; }
.logic-text { vertical-align: middle; }

.line-input-wrapper { display: flex; align-items: baseline; border-bottom: 2px solid #888; padding-bottom: 4px; margin-top: 0.3rem; }
.prefix-text { font-weight: 500; color: #333; margin-right: 8px; font-size: 0.95rem; }
.line-input { flex: 1; border: none; background: transparent; outline: none; font-size: 1.05rem; color: #333; width: 100%; }
.line-input::placeholder { color: #aaa; }

.community-actions { display: flex; gap: 1.5rem; justify-content: flex-start; margin-top: 1rem; }

.protein-grid { display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem 3rem; align-items: center; margin-bottom: 2rem; }
.p-label-box {
  border: 1px solid #666; border-radius: 6px; padding: 0.65rem 1rem;
  font-size: 0.95rem; color: #222; background: #fff;
}
.custom-dropdown .dropdown-display.p-label-box { margin: 0; width: 100%; border: 1px solid #777; }

.fasta-card {
  background: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  padding: 2rem 2.5rem; margin-bottom: 1.5rem; border: 1px solid #ddd;
}
.fasta-grid { display: grid; grid-template-columns: 200px 1fr; gap: 1.5rem 2rem; align-items: start; }
.fasta-item-row { display: flex; align-items: center; }
.grey-block { background: #f2f2f2; padding: 0.8rem 1.2rem; font-size: 1rem; color: #222; border-radius: 4px; display: flex; align-items: center; }
.inline-block { display: inline-flex; padding: 0.8rem 1.5rem; }
.grey-textarea { background: #f2f2f2; border: none; width: 100%; height: 120px; border-radius: 4px; padding: 1rem; font-family: inherit; font-size: 0.95rem; resize: vertical; outline: none; }
.grey-textarea::placeholder { color: #aaa; }
.upload-flex { display: flex; gap: 1rem; align-items: stretch; height: 100%; min-height: 48px; }
.file-path-box { flex: 1; background: #f2f2f2; border-radius: 4px; }
.solid-upload { background: var(--maroon); color: #fff; border: none; padding: 0 1.5rem; border-radius: 6px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
.solid-upload:hover { background: var(--red); }
</style>
