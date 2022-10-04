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
  constructor(year, mileage, engine_power, fuel_type, title, price, currency) {
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

  let yearElement = document.createElement("p");
  yearElement.className = "state";
  yearElement.innerHTML = x.params.year;
  offerElement.appendChild(yearElement);

  let mileageElemnt = document.createElement("p");
  mileageElemnt.innerHTML = x.params.mileage + "km";
  offerElement.appendChild(mileageElemnt);

  let enginePowerElement = document.createElement("p");
  enginePowerElement.innerHTML = x.params.engine_power + "KM";
  offerElement.appendChild(enginePowerElement);

  let fuelTypeElement = document.createElement("p");
  if(x.params.fuel_type === "petrol") {
    fuelTypeElement.innerHTML = "Benzyna";
  } else if(x.params.fuel_type === "diesel") {
    fuelTypeElement.innerHTML = "Diesel";
  }
  
  offerElement.appendChild(fuelTypeElement);

  let titleElement = document.createElement("p");
  titleElement.className = "state";
  titleElement.innerHTML = x.title;
  offerElement.appendChild(titleElement);

  document
    .getElementsByClassName("offers-data")[0]
    .appendChild(offerElement);
}
