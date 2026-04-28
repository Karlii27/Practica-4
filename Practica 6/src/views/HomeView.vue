<template>
  <div class="app-container">
    
    <header class="navbar">
      <div class="logo-area">
        <div class="logo-icon">🎬</div>
        <h1>MOVIEBAY</h1>
      </div>

      <nav class="nav-links">
        <button class="active">Recommendations</button>
        <button>Search</button>
        <button>Watchlist (0)</button>
        <button>History (0)</button>
      </nav>

      <div class="user-area">
        <span class="user-email">KarliM@gmail.com</span>
        <button class="logout-btn">↪ Logout</button>
      </div>
    </header>

    <main class="main-content">
      <div v-if="cargando" class="text-center text-gray-400 my-20">
        <h2 class="text-2x1 animate-pulse">Cargando películas...</h2>
      </div>
      
      <TopMovies :movies="topMovies" @seleccionar="verDetalles" />

      <div class="section-header categories-header">
        <div class="icon-box bg-orange">📅</div>
        <div>
          <h2>Latest Releases by Genre</h2>
          <p>Discover new movies in your favorite genres</p>
        </div>
      </div>

      <MovieCategory 
        v-for="category in movieCategories" 
        :key="category.name" 
        :category="category"
        @seleccionar="verDetalles"
      />

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopMovies from '../components/TopMovies.vue'
import MovieCategory from '../components/MovieCategory.vue'

// Variables reactivas
const topMovies = ref([])
const movieCategories = ref([])
const cargando = ref(true)

const obtenerPeliculas = async()=>{
  try{
    const res = await fetch("https://devsapihub.com/api-movies")
      if (!res.ok){
        throw new Error("Error en la solicitud a la API")
      }
      const datosQuemados = await res.json()

      // map sirve para ir recorriendo uno a uno cada elemento que envia la API, para asignarle propiedades
      const peliculasFormateadas = datosQuemados.map(peli =>({
        id: peli.id,
        title: peli.title,
        year: peli.year,
        genre: peli.genre,
        image: peli.image_url,
        rating: peli.stars
      }))
      // Comparación de mayor a menor para el top 10 y con slice paramos la iteració hasta 10
      topMovies.value = peliculasFormateadas
            .sort((a,b) => b.rating - a.rating)
            .slice(0,10)
            .map((peli, index) =>({
              ...peli,
              rank: index + 1
            }))


            //Categorías
      const porGenero ={}
      peliculasFormateadas.forEach(peli =>{
        if (!porGenero[peli.genre]){
            porGenero[peli.genre] = [] 
        }
      porGenero[peli.genre].push(peli)
  })

  movieCategories.value = Object.entries(porGenero).map(([genre, movies]) =>({
    name: genre,
    movies: movies
  }))

  }
  catch(error){
    console.error("Error al obtener películas:", error.message)
    alert("Ocurrió un conflicto al cargar las películas")

  }
  finally{
    cargando.value = false

  }

 
}

  onMounted(()=>{
    obtenerPeliculas()
  })
  const verDetalles = (pelicula) =>{
    alert(`Seleccionaste: ${pelicula.title} (${pelicula.year})`)
  }

</script>

<style scoped>
.app-container {
  min-height: 100vh;
  padding-bottom: 80px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #2f0000; /*Color del fondo del nav*/
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-wrap: wrap;
  gap: 16px;
}

.logo-area { display: flex; align-items: center; gap: 12px; }
.logo-icon { background: linear-gradient(135deg, #a855f7, #ec4899); padding: 8px; border-radius: 8px; }
.logo-area h1 { font-size: 1.25rem; letter-spacing: 2px; }

.nav-links {
  display: flex;
  background-color: #43050b; /*Color el nav de los enlaces*/
  border-radius: 50px;
  padding: 4px;
}
.nav-links button {
  background: transparent; border: none; color: #9ca3af;
  padding: 8px 24px; cursor: pointer; border-radius: 50px;
  transition: all 0.3s;
}
.nav-links button:hover { color: white; }
.nav-links button.active { background-color:#590a12; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); } /*Color del enlace seleccionado*/

.user-area { display: flex; align-items: center; gap: 16px; }
.user-email { color: #d1d5db; font-size: 0.875rem; }
.logout-btn {
  background: transparent; border: 1px solid #4b5563; color: white;
  padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: 0.3s;
}
.logout-btn:hover { background-color: rgba(255, 255, 255, 0.1); }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .user-email { display: none; }
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px;
}

.categories-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  margin-top: 48px;
}
.icon-box { padding: 12px; border-radius: 12px; font-size: 1.5rem; }
.bg-orange { background-color: #f97316; }
.categories-header h2 { font-size: 1.5rem; }
.categories-header p { color: #9ca3af; font-size: 0.875rem; margin-top: 4px; }
</style>