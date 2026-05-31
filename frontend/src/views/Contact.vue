<template>
  <div class="contact">
    <div class="contact-header-strip">
      <span>▼ Contact us</span>
    </div>
    
    <div class="contact-card-shadow">
      <div class="info-line">Team Name: Sour Soup Frontier Lab</div>
      <div class="info-line">Na Liu:</div>
      <div class="info-line">Address: SSF Lab, school of liquor and food engineering, Guizhou University, China</div>
    </div>

    <p class="contact-desc">
      If you have any questions, comments or suggestions about our website, please feel free to contact us.
    </p>

    <h3 class="form-title">Comments and suggestions are welcomed</h3>
    
    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Email address</label>
        <input type="email" v-model="form.email" placeholder="name@example.com" required />
      </div>
      <div class="form-group">
        <label>Subject</label>
        <input type="text" v-model="form.subject" placeholder="Data download" />
      </div>
      <div class="form-group">
        <label>Message</label>
        <textarea v-model="form.message" placeholder="Your suggestions or comments" required></textarea>
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn-solid" @click="resetForm">Reset</button>
        <button type="submit" class="btn-solid" :disabled="submitting">Submit</button>
      </div>
    </form>

    <div class="contact-footer">
      <div class="footer-text">
        <div>Office hours: Monday to Friday, 9:00 am to 5:00 pm</div>
        <div>Response time: 1-3 working days</div>
      </div>
      <div class="qr-container">
        <div class="qr-title">公众号二维码</div>
        <img src="/src/assets/images/image110.jpeg" alt="QR Code" class="qr-img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { submitContact } from '../api/index'

const form = ref({ email: '', subject: '', message: '' })
const submitting = ref(false)
const submitted = ref(false)

function resetForm() {
  form.value = { email: '', subject: '', message: '' }
  submitted.value = false
}

async function handleSubmit() {
  submitting.value = true
  try {
    // API mock handler mapped to form
    await submitContact({ ...form.value, name: 'Anonymous User' })
  } catch {}
  submitted.value = true
  submitting.value = false
  resetForm()
  alert('Thank you for your feedback!')
}
</script>

<style scoped>
.contact {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}

.contact-header-strip {
  background: var(--maroon);
  color: #fff;
  padding: 0.6rem 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.contact-card-shadow {
  background: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 4px 6px 12px rgba(0,0,0,0.15);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.info-line {
  background: #f4f4f4;
  padding: 0.7rem 1.2rem;
  font-size: 0.95rem;
  color: #222;
  border-radius: 2px;
}

.contact-desc {
  font-size: 1.05rem;
  color: #333;
  margin: 2.5rem 0 2rem;
  line-height: 1.5;
}

.form-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.95rem;
  color: #000;
  font-weight: 500;
}

.form-group input, .form-group textarea {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group input:focus, .form-group textarea:focus {
  border-color: var(--maroon);
}

.form-group textarea {
  height: 120px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-solid {
  padding: 0.6rem 1.8rem;
  background: var(--maroon);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.btn-solid:hover {
  background: var(--red);
}

.contact-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2rem;
  /* Add tiny bottom red border to resemble footer separator if necessary */
  padding-bottom: 1rem;
}

.footer-text {
  font-size: 0.9rem;
  color: #111;
  line-height: 1.6;
}

.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
}

.qr-title {
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 0.2rem;
}

.qr-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .contact-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
}
</style>
