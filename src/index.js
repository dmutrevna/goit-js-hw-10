import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

catInfo.style.padding = '20px';

breedSelect.style.display = 'none';
breedSelect.style.cursor = 'pointer';
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
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
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
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      breedSelect.style.display = 'block';
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
      <img src="${cat.image}"width="400" alt="${cat.name}" style="display: block; margin: 0 auto;border-radius: 50px">
      <h2 style="text-align: center; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; color: #333;">${cat.name}</h2>
 <p style="font-family: Arial, sans-serif; font-size: 16px; color: #666;">${cat.description}</p>
      <p style="font-family: Arial, sans-serif; font-size: 14px; color: #888;"><b style="font-weight: bold;color: #333;">Temperament: </b>${cat.temperament}</p>
    </div>
  `;
}
