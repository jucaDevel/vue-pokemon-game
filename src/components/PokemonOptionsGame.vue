<template>
    <div v-if="showAnswer">
        <h2 class="fade-in">{{message}}</h2>
        <button v-if="gameOver" @click="$emit('newGame')">
            New Game
        </button>
        <button v-else @click="$emit('nextPokemon')">
            Next
        </button>
    </div>
</template>

<script>
export default {
    props:{
        message:{
            type: String,
            required: true,
            default: ''
        },
        gameOver:{
            type: Boolean,
            required: true,
            default: false
        },
        showAnswer:{
            type: Boolean,
            required: true,
            default: false
        }
    }
}
</script>

<style>

</style>