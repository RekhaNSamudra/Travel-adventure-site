
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const cityId = new URLSearchParams(search);
  return cityId.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const adventures = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    return adventures.json();
  } catch (err) {
    return null;
  }
} 



//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
   let parent = document.getElementById("data");
   adventures.forEach(function(card){
   let adventuresDiv = document.createElement("div");
    adventuresDiv.classList.add("col-12", "col-sm-6", "col-lg-3", "mb-3");
    adventuresDiv.innerHTML = `
    <a href="detail/?adventure=${card.id}" id="${card.id}">
    <div class="activity-card">
    <img src=${card.image}> 
    <div class="category-banner">${card.category}
    </div>
    <div class="card-body col-md-12 mt-2">
    <div class="d-flex justify-content-between">
    <p>${card.name}</p>
    <p>${card.costPerHead}</p>
    </div>
    <div class="d-flex justify-content-between">
    <p>Duration</p>
    <P>${card.duration} Hours</p>
    </div>
    </div>
    </div>
    </a>
    `
    parent.appendChild(adventuresDiv);
   }) 

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filterList = list.filter(elem => elem.duration >= low && elem.duration <= high);
  console.log("durationList", filterList);
  return filterList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
    // const filteredList = list.forEach(adventure => adventure.category === categoryList);
    const arr = [];
    categoryList.forEach(category => {

      list.forEach((elem) => { if(elem.category === category)
        arr.push(elem);
      })

    })
   // console.log('filteredList', adventure);
    return arr;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  const durationArr = filters.duration.split('-');
  const low = parseInt(durationArr[0]);
  const high = parseInt(durationArr[1]);

if(filters.category.length > 0)
  list = filterByCategory(list, filters.category);

if(filters.duration.length > 0) {
  list = filterByDuration(list, low, high);
}

if(filters.duration !== "" && filters.category.length > 0) 
{
  filterByCategory(list, filters.category);
  filterByDuration(list, low, high);
  // console.log("list", list);
}
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
 // localStorage.setItem("category", JSON.stringify(filters.category));
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  //const savedDuration = JSON.parse(localStorage.getItem("duration"));
  const obj = JSON.parse(localStorage.getItem("filters"));
  //const obj = {savedCategory, savedDuration};
  // Place holder for functionality to work in the Stubs
  return obj;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  //Sets value in dropdown for duration filter
  // NOTE - Needed to display value read from localstorage on reloadcd 
  document.getElementById("duration-select").value = filters.duration;

  //Iterates over category filters and inserts category pills into DOM
  filters["category"].forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
                 <div>${key}</div>
                `;

    document.getElementById("category-list").appendChild(ele);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
