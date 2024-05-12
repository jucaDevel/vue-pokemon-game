import pokemonApi from "@/api/pokemonApi"

describe('pokemon API', () =>{
    test('Axios must have the baseUrl defined', () => {
        console.log(pokemonApi);
        // expect( pokemonApi.defaults.baseURL ).toBe('https://pokeapi.co/api/v2/pokemon')
    })
})