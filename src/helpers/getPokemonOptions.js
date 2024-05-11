import pokemonApi from "@/api/pokemonApi"; /**Objeto con la instancia a axios */

const getPokemons = () => {

    const pokemonsArr = Array.from( Array(650) )
    /** Array.from es una función que nos permite crear un array con x cantidad de posiciones predefinidas*/
    return pokemonsArr.map(( _, index ) => index + 1)
}

const getPokemonOptions = async () =>{
    const mixedPokemons = getPokemons()
                            .sort( ()=> Math.random() - 0.5 ); 
    /**Ordena el array de manera aleatoria */
    
    const pokemonsNames = await getPokemonsNames(mixedPokemons.splice(0,4));
    /** Hacemos el llamado a la función que llama al API*/

    return pokemonsNames
}

const getPokemonsNames = async ( [a,b,c,d] = [] ) => {
    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
    ]
    const [ p1, p2, p3, p4 ] = await Promise.all(promiseArr) /** Objeto que ejecuta un metodo para hacer multiples llamados al API*/

    return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id }
    ]
}

export default getPokemonOptions