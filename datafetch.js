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
    return body.data;
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
    offersTable.push(new OfferData(x.title, x.Year, x.Population));
    addElement(x);
  }
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

let _yearState = 0;
let _populationState = 0;
let _stateState = 0;

function sortByYear() {
  removeElementsByClass("state");
  removeElementsByClass("year");
  removeElementsByClass("population");
  removeElementsByClass("content-box");

  if (_yearState == 0) {
    statTable.sort((a, b) => a.Year - b.Year);
    _yearState = 1;
  } else if (_yearState == 1) {
    statTable.sort((a, b) => b.Year - a.Year);
    _yearState = 0;
  }

  for (x of statTable) {
    addElement(x);
  }
}

function sortByPopulation() {
  removeElementsByClass("state");
  removeElementsByClass("year");
  removeElementsByClass("population");
  removeElementsByClass("content-box");

  if (_populationState == 0) {
    statTable.sort((a, b) => a.Population - b.Population);
    _populationState = 1;
  } else if (_populationState == 1) {
    statTable.sort((a, b) => b.Population - a.Population);
    _populationState = 0;
  }

  for (x of statTable) {
    addElement(x);
  }
}

function sortByState() {
  removeElementsByClass("state");
  removeElementsByClass("year");
  removeElementsByClass("population");
  removeElementsByClass("content-box");

  if (_stateState == 0) {
    statTable.sort(function (a, b) {
      if (a.State < b.State) {
        return -1;
      }
      if (a.State > b.State) {
        return 1;
      }
    });
    _stateState = 1;
  } else if (_stateState == 1) {
    statTable.sort(function (a, b) {
      if (b.State < a.State) {
        return -1;
      }
      if (b.State > a.State) {
        return 1;
      }
    });
    _stateState = 0;
  }

  for (x of statTable) {
    addElement(x);
  }
}

function defaultSetting() {
  removeElementsByClass("state");
  removeElementsByClass("year");
  removeElementsByClass("population");
  removeElementsByClass("content-box");

  statTable.sort(function (a, b) {
    if (a.State < b.State) {
      return -1;
    }
    if (a.State > b.State) {
      return 1;
    }
  });
  _stateState = 1;
  statTable.sort((a, b) => b.Year - a.Year);
  _yearState = 0;
  for (x of statTable) {
    addElement(x);
  }
}

class OfferData {
  constructor(title) {
    this.Title = title;
  }
}

function addElement(x) {
  let statElement = document.createElement("section");
  statElement.classList.add("content-box");
  statElement.classList.add("bg-blur");

  let nationElement = document.createElement("header");
  nationElement.className = "state";
  nationElement.innerHTML = x.State;
  statElement.appendChild(nationElement);

  

  document
    .getElementsByClassName("population-statistics")[0]
    .appendChild(statElement);
}
