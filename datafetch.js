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
    let params = x.params;

    let photos = x.photos;
    let photo1 = photos[1];
    let photoSrc1 = photo1["320x240"];

    let price = x.params.price;
    let priceCurrency = new Intl.NumberFormat('pl-PL').format(price[1]);
    let currency = price["currency"];
    let gross = price["gross_net"];

    offersTable.push(new OfferModel(photoSrc1, params.model, params.year, params.mileage, params.engine_power, params.fuel_type, x.title, priceCurrency, currency, gross));
    addElement(x);
  }
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

let _priceState = 0;

function sortByPrice() {

  removeElementsByClass("content-box");

  if (_priceState == 0) {
    console.log("now")
    //offersTable.sort((a, b) => a.Price - b.Price);
    _priceState = 1;
  } else if (_priceState == 1) {
    //offersTable.sort((a, b) => b.Price - a.Price);
    _priceState = 0;
  }

  for (x of offersTable) {
    addElement(x);
  }
}


class OfferModel {
  constructor(photos, model, year, mileage, engine_power, fuel_type, title, price, currency, gross) {
    this.Photos = photos;
    this.Model = model;
    this.Year = year;
    this.Mileage = mileage;
    this.Engine_power = engine_power;
    this.Fuel_type = fuel_type;
    this.Title = title;
    this.Price = price;
    this.Currency = currency;
    this.Gross = gross;
  }
}

function addElement(x) {
  let offerElement = document.createElement("section");
  offerElement.classList.add("content-box");

  let logoBox = document.createElement("div");
  logoBox.className = "logoBox";

  let logo1 = document.createElement("img");
  logo1.className = "logo1";
  logo1.setAttribute("src", "https://www.wyborkierowcow.pl/wp-content/uploads/2022/04/SsangYong-Symbol-scaled.jpg");
  logoBox.appendChild(logo1);

  let logo2 = document.createElement("div");
  logo2.className = "logo2";
  let biacomex = document.createElement("p");
  let bialystok = document.createElement("p");
  biacomex.innerHTML = "BIACOMEX";
  bialystok.innerHTML = "Białystok";
  logo2.appendChild(biacomex);
  logo2.appendChild(bialystok);

  logoBox.appendChild(logo2);
  offerElement.appendChild(logoBox);

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
  titleElement.innerHTML = x.title;
  desc.appendChild(titleElement);

  let priceElement = document.createElement("p");
  priceElement.className = "price";
  let price = x.params.price;
  let priceCurrency = new Intl.NumberFormat('pl-PL').format(price[1])
  priceElement.innerHTML = priceCurrency + " " + price.currency;
  desc.appendChild(priceElement);

  let faktura = document.createElement("p");
  faktura.className = "faktura";
  let pricex = x.params.price;
  let gross = pricex["gross_net"];
  if(gross != "") {
    faktura.innerHTML = "brutto / Faktura VAT";
  } else {
    faktura.innerHTML = "netto / Faktura VAT"
  }
  
  desc.appendChild(faktura);

  offerElement.appendChild(desc);

  let ribbon = document.createElement("h4");
  ribbon.className = "ribbon";
  ribbon.innerHTML = "NOWY";
  let new_used = x.new_used;
  if(new_used === "new") {
    offerElement.appendChild(ribbon);
  }
  

  document
    .getElementsByClassName("offers-data")[0]
    .appendChild(offerElement);
}
