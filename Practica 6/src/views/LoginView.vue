<template>
  <div class="login-page">
    <div class="login-card">
      <div class="logo-box">
        <span class="film-icon">🎬</span>
      </div>
      <h1 class="brand-title">MOVIEBAY</h1>
      <p class="subtitle">Inicie sesión para acceder a tus películas</p>

      <form @submit.prevent="iniciarSesion" class="login-form">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="juan.perez@ejemplo.com" v-model="email" required/>
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" placeholder="Ingrese su contraseña" v-model="password" required/>
        </div>

        <button type="submit" class="sign-in-btn">Iniciar Sesión</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const email = ref('')
const password = ref('')

const iniciarSesion = () =>{
    if (password.value.length >= 6){
        localStorage.setItem('autenticado', 'true')
        router.push("/")
    }else{
        alert("La contraseña debe tener al menos 6 caracteres")
    }
}



</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #880102, #3e0000); /*Fondo del login*/ 
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  padding: 20px;
}

.login-card {
  background-color: #3c0000; /*Fondo de la tarjeta de sesion*/
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(170, 167, 167, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-box {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ad3430, #830202); /*Grandiente del circulito*/ 
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.film-icon {
  font-size: 28px;
  color: white;
}

.brand-title {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.subtitle {
  color: #9ca3af;
  font-size: 14px;
  text-align: center;
  margin-bottom: 30px;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 500;
}

.input-group input {
  background-color: #1e0000;  /*Fondo de los placeholders*/
  border: 1px solid rgb(48, 43, 43);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s;
}

.input-group input::placeholder {
  color: #6b7280;
}

.input-group input:focus {
  border-color: #950101;
}

.sign-in-btn {
  background-color: white;
  color: black;
  font-weight: 600;
  font-size: 16px;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.sign-in-btn:hover {
  background-color: #f3f4f6;
}

.demo-text {
  margin-top: 24px;
  font-size: 13px;
  color: #6b7280;
}
</style>
