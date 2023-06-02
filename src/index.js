import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

breedSelect.style.display = 'none';
loader.style.display = 'none';
error.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
  })
  .catch(error => {
    loader.style.display = 'none';
    error.style.display = 'none';
    console.log(error);
  });

breedSelect.addEventListener('change', () => {
  loader.style.display = 'block';
  error.style.display = 'none';
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';

  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      renderCatInfo(cat);
      breedSelect.style.display = 'block';
      loader.style.display = 'none';
      catInfo.style.display = 'block';
    })

    .catch(error => {
      loader.style.display = 'none';
      error.style.display = 'block';

      Notiflix.Notify.Failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(error);
    });
});

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = '';
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function renderCatInfo(cat) {
  catInfo.innerHTML = `
    <div class="renderCatInfo">
      <img src="${cat.image}"width=400 alt="${cat.name}">
      <h2>${cat.name}</h2>
      <p>${cat.description}</p>
      <p><b>Temperament: </b>${cat.temperament}</p>
    </div>
  `;
}

// new SlimSelect({
//   showSearch: false,
//   placeholder: 'Select a breed',
//   allowDeselect: true,
//   placeholderText: 'Select a breed',
//   onChange: value => {
//     // Обробка зміни вибору
//     console.log('Selected value:', value);
//   },
// });
