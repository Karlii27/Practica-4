<template>
  <div class="section-container">
    <div class="section-header">
      <div class="icon-box gradient-pink">📈</div>
      <div>
        <h2>Top 10 This Week</h2>
        <p>Most popular movies right now</p>
      </div>
    </div>

    <div class="movies-grid">
      <MovieCard 
        v-for="movie in movies" 
        :key="movie.id" 
        :movie="movie"
        @seleccionar="$emit('seleccionar', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue'
defineProps({ movies: Array })
defineEmits(['seleccionar'])
</script>

<style scoped>
.section-container {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.icon-box {
  padding: 12px;
  border-radius: 12px;
  font-size: 1.5rem;
}

.gradient-pink {
  background: linear-gradient(135deg, #ec4899, #9333ea);
}

.section-header h2 { font-size: 1.5rem; }
.section-header p { color: #9ca3af; font-size: 0.875rem; margin-top: 4px; }

/* Grid mágico que se adapta solo sin media queries */
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}
</style>