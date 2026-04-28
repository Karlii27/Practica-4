<template>
  <div class="category-container">
    <h3 class="category-title">{{ category.name }}</h3>
    
    <div class="scroll-container">
      <div 
        v-for="movie in category.movies" 
        :key="movie.id" 
        class="movie-wrapper"
      >
        <MovieCard :movie="movie" @seleccionar="$emit('seleccionar', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue'
defineProps({ category: Object })
defineEmits(['seleccionar'])
</script>

<style scoped>
.category-container {
  margin-bottom: 40px;
  width: 100%;
}

.category-title {
  font-size: 1.25rem;
  margin-bottom: 16px;
}

.scroll-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 16px;
  scroll-snap-type: x mandatory;
  /* Ocultar barra de scroll nativa */
  scrollbar-width: none; 
}
.scroll-container::-webkit-scrollbar {
  display: none;
}

.movie-wrapper {
  flex: 0 0 auto; /* Para que no se encojan */
  width: 250px;
  scroll-snap-align: start;
}
</style>