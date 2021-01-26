/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  form = event.target
  let newKitten = {
    id: generateId(),
    name: form.name.value,
    affection: 5,
    mood: "tolerant"
  }
  newKitten.picture = "https://robohash.org/" + newKitten.name + "?set=set4"
  newKitten.mood = setKittenMood(newKitten)

  if (kittens.find(kitten => kitten.name == newKitten.name)) {
    window.alert("You can't have the same cat more than once")
  } else {
    kittens.push(newKitten)
    saveKittens()
    drawKittens()

  }
  form.reset()

}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittenData) {
    kittens = kittenData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenTemplate = ""
  kittens.forEach(kitten => {
    kittenTemplate += `
      <div class="bg-dark m-1">
        <div class="img-center w-width kitten ${kitten.mood}">
          <img src="${kitten.picture}" class="mt-2 mb-1">
        </div>
        <div>
          <div class="mt-1 text-light text-center"><span>Name: ${kitten.name}</span></div>
        </div>`
    if (kitten.affection <= 0) {
      kittenTemplate += `<div class="d-flex justify-content-center mb-1">
          <div class="mt-1 text-light text-center text-danger"><span>Gone, Ran away</span></div>
        </div>
      </div>`
    } else {
      kittenTemplate += `
      <div>
          <div class="mt-1 text-light text-center"><span>Mood:</span> <span id="mood">${kitten.mood}</span></div>
        </div>
        <div>
          <div class="mt-1 text-light text-center"><span>Affection:</span> <span id="affection">${kitten.affection}</span></div>
        </div>
      
      <div class="d-flex justify-content-center mb-1">
          <button class="btn-cancel m-1" onclick="pet('${kitten.id}')">Pet</button>
          <button class="text-color m-1" onclick="catnip('${kitten.id}')">Catnip</button>
        </div>
      </div>`
    }
  })

  document.getElementById("kittens").innerHTML = kittenTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  currentKitten = findKittenById(id)
  let rand = Math.random()

  if (rand > 0.7) {
    currentKitten.affection++
  } else {
    currentKitten.affection--
  }
  currentKitten.mood = setKittenMood(currentKitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  currentKitten = findKittenById(id)
  currentKitten.affection = 5
  currentKitten.mood = setKittenMood(currentKitten)
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let currentMood = "tolerant"

  if (kitten.affection <= 0) {
    currentMood = "gone"
  } else if (kitten.affection <= 3) {
    currentMood = "angry"
  } else if (kitten.affection <= 5) {
    currentMood = "tolerant"
  } else if (kitten.affection > 6) {
    currentMood = "happy"
  }

  return currentMood
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

function resetKittens() {
  kittens = []
  drawResetBtn()
  saveKittens()
  getStarted()
}

function drawResetBtn() {
  document.getElementById("reset-btn").innerText = "Reset " + kittens.length + " kittens"
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
loadKittens()
drawResetBtn()
