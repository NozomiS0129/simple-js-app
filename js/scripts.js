let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');
    
    function add(pokemon) {
        pokemonList.push(pokemon);
    }    
    
    function getAll() {
        return pokemonList;
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
            showModal(item.name, 'Height: ' + item.height, 'Type: ' + item.typeName1, item.typeName2, item.imageUrl);
        });
    }

    function showModal(name, height, types1, types2, img) {
        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');
      
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
      
        let pokemonName = document.createElement('h1');
        pokemonName.innerText = name;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = height;

        let typeContainer = document.createElement('div')
        typeContainer.classList.add('type-container')

        let pokemonTypes1 = document.createElement('p');
        pokemonTypes1.classList.add('pokemon-type1');
        pokemonTypes1.innerText = types1;

        let pokemonTypes2 = document.createElement('p');
        pokemonTypes2.classList.add('pokemon-type2');
        pokemonTypes2.innerText = types2;
        if(types2 === undefined){
            pokemonTypes2.classList.add('is-hide');
        };

        let imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        let pokemonImage = document.createElement('img');
        pokemonImage.setAttribute('src', img);
        pokemonImage.setAttribute('width', '150');
        pokemonImage.setAttribute('height', '150');
        pokemonImage.setAttribute('alt', 'the image of pokemon');
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonHeight);
        typeContainer.appendChild(pokemonTypes1);
        typeContainer.appendChild(pokemonTypes2);
        modal.appendChild(typeContainer);
        imageContainer.appendChild(pokemonImage);
        modal.appendChild(imageContainer);
        modalContainer.appendChild(modal);
      
        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
    });

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