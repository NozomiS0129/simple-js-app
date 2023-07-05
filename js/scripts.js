let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Jigglypuff',
            height: 0.5,
            weight: 5.5,
            type: ['fairy','normal']
        },
        {
            name: 'Squirtle',
            height: 0.5,
            weight: 9.0,
            type: 'water'
        },
        {
            name: 'Ditto',
            height: 0.3,
            weight: 4.0,
            type: 'normal'
        },
        {
            name: 'Mew',
            height: 0.4,
            weight: 4.0,
            type: 'psychic'
        },
        {
            name: 'Onix',
            height: 8.8,
            weight: 210,
            type: ['rock','ground']
        }    
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    };
})()

pokemonRepository.getAll().forEach(function(pokemon) {
    let nameAndHeight = `${pokemon.name}(height: ${pokemon.height})`;

    if(pokemon.height > 8){
        document.write(`${nameAndHeight} - Wow, that\'s big!`);
    }else{
        document.write(nameAndHeight);
    }
    document.write('</br>');
});