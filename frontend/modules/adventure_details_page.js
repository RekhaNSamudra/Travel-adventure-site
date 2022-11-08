import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const adventureId = urlParams.get("adventure");
  return adventureId;
  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const result = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;

  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;


  adventure.images.map((image) => {
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML =  `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
    />
    `;
    document.getElementById("photo-gallery").appendChild(ele);
  });

  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#arouselExampleIndicators" data-bs-slide="0"  class="active" aria-current="true" aria-label="Slide 1"</li>
      <button type="button" data-bs-target="#arouselExampleIndicators" data-bs-slide="1"  aria-label="Slide 2"</li>
      <button type="button" data-bs-target="#arouselExampleIndicators" data-bs-slide="2"  aria-label="Slide 3"</li>
    </div>

    <div class="carousel-inner" id="carousel-inner">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Prev</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

images.map((image, idx) => {
  let ele = document.createElement("div");
  ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
  ele.innerHTML =  `
  <img 
      src=${image}
      alt=""
      srcset=""
      class="activity-card-image pb-3 pb-md-0"
      />
  `;

  document.getElementById("carousel-inner").appendChild(ele);
});

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
