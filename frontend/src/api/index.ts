import request from './request'
import axios from 'axios'

// 创建不同的请求实例
const request2 = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL2 || '/api2',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})
request2.interceptors.response.use(
  res => res.data,
  error => {
    console.error('[API2 Error]', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

const request3 = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL3 || '/api3',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})
request3.interceptors.response.use(
  res => res.data,
  error => {
    console.error('[API3 Error]', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

const request4 = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL4 || '/api4',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})
request4.interceptors.response.use(
  res => res.data,
  error => {
    console.error('[API4 Error]', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

const request5 = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL5 || '/api5',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})
request5.interceptors.response.use(
  res => res.data,
  error => {
    console.error('[API5 Error]', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

// ─── Home ───────────────────────────────────────────────

/** 获取首页统计数字 */
export function getHomeStats() {
  // Mock data for now
  return Promise.resolve({
    totalFoods: 25,
    totalBacteria: 150,
    totalFungi: 50,
    totalPredictions: 1250
  })
}

/** 全局搜索 */
export function globalSearch(_query: string) {
  // Mock data for now
  return Promise.resolve({
    results: [
      { type: 'food', name: 'Yoghurt', description: 'Dairy product' },
      { type: 'bacteria', name: 'Lactobacillus', description: 'Common probiotic' }
    ]
  })
}

// ─── Browse ─────────────────────────────────────────────

/** 获取发酵食品列表（分页） */
export function getFermentedFoods(page = 1, pageSize = 15) {
  // Mock data for now
  const foods = [
    { name: 'Steamed bun', img: '/images/image13.png' },
    { name: 'Wine', img: '/images/image14.png' },
    { name: 'Vinegar', img: '/images/image15.png' },
    { name: 'Sour Soup', img: '/images/image16.png' },
    { name: 'Fermented tofu', img: '/images/image17.png' },
    { name: 'Yoghurt', img: '/images/image18.png' },
    { name: 'Bread', img: '/images/image19.png' },
    { name: 'Cheese', img: '/images/image20.png' },
    { name: 'Pickled cabbage', img: '/images/image21.png' },
    { name: 'Ham', img: '/images/image22.png' },
    { name: 'Fermented chilli paste', img: '/images/image23.png' },
    { name: 'Soy sauce', img: '/images/image24.png' },
    { name: 'Rice wine', img: '/images/image25.png' },
    { name: 'Fermented black beans', img: '/images/image26.png' },
    { name: 'Fermented tea', img: '/images/image27.png' },
  ]
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return Promise.resolve({
    data: foods.slice(start, end),
    total: foods.length,
    page,
    pageSize
  })
}

/** 获取细菌列表 */
export function getBacteria(page = 1, pageSize = 50) {
  // Mock data for now
  const bacteria = [
    { name: 'Propioni bacterium', img: '/images/image83.jpeg' },
    { name: 'Pediococcus Claussen', img: '/images/image75.jpeg' },
    { name: 'Bifidobacterium bifidum', img: '/images/image74.jpeg' },
    { name: 'Lactobacillus casei', img: '/images/image76.jpeg' },
    { name: 'Lactobacillus Plantarum', img: '/images/image77.png' },
    { name: 'Bacillus', img: '/images/image78.jpeg' },
  ]
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return Promise.resolve({
    data: bacteria.slice(start, end),
    total: bacteria.length,
    page,
    pageSize
  })
}

/** 获取真菌列表 */
export function getFungi(page = 1, pageSize = 50) {
  // Mock data for now
  const fungi = [
    { name: 'Saccharomyces cerevisiae', img: '/images/image79.png' },
    { name: 'Aspergillus oryzae', img: '/images/image80.jpeg' },
    { name: 'Penicillium roqueforti', img: '/images/image81.jpeg' },
  ]
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return Promise.resolve({
    data: fungi.slice(start, end),
    total: fungi.length,
    page,
    pageSize
  })
}

/** 按地区获取食品 */
export function getFoodsByRegion(_region: string) {
  // Mock data for now
  return Promise.resolve({
    data: [
      { name: 'Kimchi', region: 'Korea' },
      { name: 'Sauerkraut', region: 'Germany' }
    ]
  })
}

/** 按代谢通路浏览 */
export function getFoodsByPathway(_pathway: string) {
  // Mock data for now
  return Promise.resolve({
    data: [
      { name: 'Yoghurt', pathway: 'Lactic acid fermentation' }
    ]
  })
}

// ─── Details ────────────────────────────────────────────

/** 获取食品/菌株详情 */
export function getDetail(id: string) {
  // Mock data for now
  return Promise.resolve({
    name: decodeURIComponent(id),
    description: `Detailed information about ${decodeURIComponent(id)}`,
    properties: {
      origin: 'Various regions',
      fermentation_type: 'Lactic acid',
      nutritional_value: 'High in probiotics'
    }
  })
}

// ─── Server Tools ────────────────────────────────────────

export interface StrainInput {
  food_type: string
  safety_score: number
  tolerance_score: number
  fermentation_potential_score: number
  flavor_score: number
  growth_score: number
  acid_production_score: number
  enzyme_activity_score: number
}

export interface FlavorInput {
  food_type: string
  flavor_score: number
  acid_production_score: number
  enzyme_activity_score: number
  alcohol_production_score: number
  aroma_score: number
  tolerance_score: number
}

export interface SynergyInput {
  food_type: string
  acid_a: number
  acid_b: number
  aroma_a: number
  aroma_b: number
  tolerance_a: number
  tolerance_b: number
  growth_a: number
  growth_b: number
  enzyme_a: number
  enzyme_b: number
}

export interface StrainRecommendInput {
  food_type: string
  flavor_keywords?: string
  performance_keywords?: string
  topk?: number
}

export interface ProteinInput {
  sequence: string
  threshold?: number
}

/** 工具1: 预测优势菌株 */
export function predictSuperiorStrains(data: StrainInput) {
  return request.post('/predict', data)
}

/** 工具2: 预测风味物质 */
export function predictFlavourCompounds(data: FlavorInput) {
  return request2.post('/predict', data)
}

/** 工具3: 预测协同效应 */
export function predictSynergisticEffects(data: SynergyInput) {
  return request3.post('/predict', data)
}

/** 工具4: 预测合成核心菌群配方 */
export function predictSyntheticMicrobialCommunity(data: StrainRecommendInput) {
  return request4.post('/predict', data)
}

/** 工具5: 蛋白质功能预测 */
export function predictProteinFunction(data: ProteinInput) {
  return request5.post('/predict', data)
}

// ─── Download ────────────────────────────────────────────

/** 获取可下载数据集列表 */
export function getDatasets() {
  // Mock data for now
  return Promise.resolve({
    datasets: [
      { id: '1', name: 'Strain Database', description: 'Complete strain information', size: '2.5MB' },
      { id: '2', name: 'Food Composition', description: 'Nutritional data', size: '1.8MB' }
    ]
  })
}

/** 获取数据集下载链接 */
export function getDatasetUrl(id: string) {
  // Mock data for now
  return Promise.resolve({
    url: `https://example.com/download/dataset-${id}.zip`,
    filename: `dataset-${id}.zip`
  })
}

// ─── Contact ─────────────────────────────────────────────

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

/** 提交联系表单 */
export function submitContact(_data: ContactForm) {
  // Mock success response
  return Promise.resolve({
    success: true,
    message: 'Thank you for your message. We will get back to you soon!'
  })
}
