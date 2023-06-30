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

for (let i = 0; i < pokemonList.length; i++) {
    let nameAndHeight = `${pokemonList[i].name}(height: ${pokemonList[i].height})`;

    if(pokemonList[i].height > 8){
        document.write(nameAndHeight + ' - Wow, that\'s big!');
    }else{
        document.write(nameAndHeight);
    }
    document.write('</br>');
}