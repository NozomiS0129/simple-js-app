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

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-btn');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function(){
            showDetails(pokemon)
        });        
    }

    function showDetails(pokemon) {
        console.log (pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})()

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
