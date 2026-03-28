
<script setup>
defineProps({
    movie: {
        type: Object,
        required: true
    }
})
defineEmits(['seleccionar'])
</script>



<template>
    
    <div class="movie.card" @click="$emit('seleccionar', movie)">
        <div class="image-container">
            <img :src="movie.image" :alt="movie.title" class="movie-image" />
            <span v-if="movie.rank" class="badge badge-rank"> #{{ movie.rank }}</span>
            <span class="badge badge-ranting"> * {{ movie.ranting }}</span>
            <span class="badge badge-year"> {{ movie.year}}</span>
        </div>
        <div class="card-info">
            <h3 class="movie-title" :title="movie.title" >{{ movie.title }}</h3>
            <p class="movie-genre">{{ movie.genre}} </p>
        </div>
    </div>
</template>

<style scoped>
.movie-card {
  background-color: #241843;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.movie-card:hover {
  transform: scale(1.05);
}

.image-container {
  position: relative;
  height: 240px;
  width: 100%;
  background-color: #111;
}

.movie-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.badge-rank {
  top: 8px;
  left: 8px;
  background-color: #a855f7;
  color: white;
}

.badge-rating {
  top: 8px;
  right: 8px;
  background-color: #fbbf24;
  color: black;
}

.badge-year {
  bottom: 8px;
  left: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  backdrop-filter: blur(4px);
}

.card-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-title {
  color: #f3f4f6;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-genre {
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 4px;
}
</style>