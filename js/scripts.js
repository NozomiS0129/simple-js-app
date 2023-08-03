let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    function add(pokemon) {
        pokemonList.push(pokemon);
    }    
    
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('list-group-item', 'text-center', 'border-0');

        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        button.classList.add('btn');
        button.innerText = pokemon.name;

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener('click', function(){
            showDetails(pokemon);
        });        
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).then(function () {
            if(item.types.length <= 1){
                item.typeName1 = (item.types[0].type.name);
            }else{
                item.typeName1 = (item.types[0].type.name);
                item.typeName2 = (item.types[1].type.name);
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
            showModal(item.name, 'Height: ' + item.height + '0cm', 'Type: ' + item.typeName1, item.typeName2, item.imageUrl);
        });
    }

    function showModal(name, height, types1, types2, img) {
        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = name;

        let pokemonHeight = document.querySelector('.pokemon-height');
        pokemonHeight.innerText = height;

        let typeContainer = document.querySelectorAll('.type-container')

        let pokemonTypes1 = document.querySelector('.pokemon-type1');
        pokemonTypes1.innerText = types1;

        let pokemonTypes2 = document.querySelector('.pokemon-type2');
        pokemonTypes2.innerText = types2;
        if(types2 === undefined){
            pokemonTypes2.classList.add('is-hide');
        } else {
            pokemonTypes2.classList.remove('is-hide');
        };

        let imageContainer = document.querySelector('.image-container');

        let pokemonImage = document.querySelector('.pokemon-img');
        pokemonImage.setAttribute('src', img);
        pokemonImage.setAttribute('width', '150');
        pokemonImage.setAttribute('height', '150');
        pokemonImage.setAttribute('alt', 'the image of pokemon');
    }

    function hideModal() {
        let modalContainer = document.querySelector('#exampleModal');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
    });

    let modalContainer = document.querySelector('#exampleModal');
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});