let offersData;

const baseURL =
  "https://gx.pandora.caps.pl/zadania/api/offers.json";

async function getJSON() {
  try {
    let response = await fetch(baseURL);

    if (!response.ok) {
      return null;
    }

    let body = await response.json();
    return body.results;
  } catch (error) {
    console.log(error);
  }
}

async function displayData(x) {
  try {
    offersData = await getJSON();
    getDataToArray(offersData);
  } catch (error) {
    console.log(error);
  }
}

displayData();

let offersTable = new Array();
function getDataToArray() {
  let _temporaryObject = offersData;
  for (x of _temporaryObject) {
    offersTable.push(new OfferModel(x.title, x.params.year));
    addElement(x);
  }
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

class OfferModel {
  constructor(photos, model, year, mileage, engine_power, fuel_type, title, price, currency) {
    this.photos = photos;
    this.model = model;
    this.year = year;
    this.mileage = mileage;
    this.engine_power = engine_power;
    this.fuel_type = fuel_type;
    this.title = title;
    this.price = price;
    this.currency = currency;
  }
}

function addElement(x) {
  let offerElement = document.createElement("section");
  offerElement.classList.add("content-box");

  let photoElement = document.createElement("img");
  photoElement.className = "photo";
  let photox = x.photos[1];
  let photoSrc = photox["320x240"];
  photoElement.setAttribute("src", photoSrc);
  offerElement.appendChild(photoElement);

  let modelElement = document.createElement("p");
  modelElement.className = "title";
  modelElement.innerHTML = x.params.model;
  offerElement.appendChild(modelElement);

  let desc = document.createElement("div");
  desc.className = "desc";
  let paramsList = document.createElement("ul");
  paramsList.className = "params-list";
  offerElement.appendChild(paramsList);
  let fuelType;
  if(x.params.fuel_type === "petrol") {
    fuelType = "Benzyna";
  } else if(x.params.fuel_type === "diesel") {
    fuelType = "Diesel";
  }
  let params = [x.params.year ,x.params.mileage + "km", x.params.engine_power + "KM", " "];
  for (let i = 0; i <= 3; i++) {
    let li = document.createElement("li");
    li.innerHTML = params[i]
    paramsList.appendChild(li);
  }
  desc.appendChild(paramsList);

  let fuel = document.createElement("p");
  fuel.className = "fuelType";
  fuel.innerHTML = fuelType;
  desc.appendChild(fuel);

  let titleElement = document.createElement("p");
  titleElement.className = "state";
  titleElement.innerHTML = x.title;
  desc.appendChild(titleElement);

  let priceElement = document.createElement("p");
  let price = x.params.price;
  priceElement.innerHTML = price[1] + " " + price.currency;
  desc.appendChild(priceElement);

  offerElement.appendChild(desc);

  document
    .getElementsByClassName("offers-data")[0]
    .appendChild(offerElement);
}
