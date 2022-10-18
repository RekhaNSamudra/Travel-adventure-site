import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  console.log("http://" + config.backendEndpoint + ":8082/cities");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log('cities',cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const data = await fetch(config.backendEndpoint + '/cities');
    return data.json();
  }catch (err) {
      return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const dataElem = document.getElementById("data");
  dataElem.innerHTML += `
      <div class="col-6 col-lg-3 mb-4">
          <a href="pages/adventures/?city=${id}" id="${id}">
              <div class="tile">
                  <div class="tile-text text-center">
                    <h5>${city}</h5>
                    <p>${description}</p>
                  </div>
                  <img class="img-responsive" src="${image}" />
               </div>
          </a>
        </div>
    `
}

export { init, fetchCities, addCityToDOM };
