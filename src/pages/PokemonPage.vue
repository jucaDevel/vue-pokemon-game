<template>
    <div>
        <h1 v-if="!pokemon">Wait Please...</h1>
        <div v-else>
            <h1>Who is this pokemon?</h1>
            <div class = "game-info">    
                <span class = "game-info-item">Lifes: {{lifes}}</span>
                <span class = "game-info-item">Score: {{score}}</span>
                <span class = "game-info-item">Max Score: {{maxScore}}</span>
            </div>
            <PokemonPicture
              :pokemonId="pokemon.id"
              :showPokemon="showPokemon" 
            />
            <PokemonOptions 
                :pokemons="pokemonArr"
                @selection="checkAnswer($event)"
            />
            <PokemonOptionsGame
                :show-answer="showAnswer"
                :game-over="gameOver"
                :message="message"
                @newGame="newGame"
                @nextPokemon="nextPokemon"
            />
        </div>
    </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions'
import PokemonPicture from '@/components/PokemonPicture'
import getPokemonOptions from '@/helpers/getPokemonOptions'
import PokemonOptionsGame from '../components/PokemonOptionsGame'

export default {
    name:'Pokemon Page',
    components:{
        PokemonOptions,
        PokemonPicture,
        PokemonOptionsGame
    },
    data(){
        return{
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            answered: false,
            message: '',
            lifes: 3,
            gameOver:false,
            score:0,
            maxScore: 0
        }
    },
    methods:{
        async mixPokemonArray(){
            this.pokemonArr = await getPokemonOptions()

            const rndInt = Math.floor( Math.random() * 4)
            this.pokemon = this.pokemonArr[ rndInt ]
        },
        getMaxScore(){
            const maxScoreStorage = parseInt(localStorage.getItem('maxScore'))
            this.maxScore = (maxScoreStorage)?maxScoreStorage:0
        },
        checkAnswer(selectedId){
            if (!this.answered) {
                this.answered = true
                this.showPokemon = true
                this.showAnswer = true
                if(selectedId === this.pokemon.id){
                    this.message = `Correct, ${this.pokemon.name}`
                    this.score+=25
                }
                else{
                    this.message = `No, it was ${this.pokemon.name}`
                    this.lifes--;
                }
    
                if(this.lifes === 0){
                    this.gameOver = true
                    const newMaxScore = (this.score > this.maxScore)?this.score:this.maxScore
                    localStorage.setItem('maxScore', newMaxScore)
                }
            }
            else{
                this.message = `You already response, please continue`
            }
        },
        resetData(){
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArr = []
            this.pokemon = null
            this.message = ''
            this.answered = false
        },
        newGame(){
            this.resetData()
            this.lifes = 3
            this.score = 0
            this.gameOver = false
            this.mixPokemonArray()
        },
        nextPokemon(){
            this.resetData()
            this.answered = false
            this.mixPokemonArray()
        }
    },
    mounted(){
        /** Hook que se ejecuta cuando el componente es montado*/
        this.getMaxScore()
        this.mixPokemonArray()
    }

}
</script>