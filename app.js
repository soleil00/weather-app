const choosenCity = document.querySelector("#myInput");
choosenCity.value = "Kigali";

async function getWeather() {
  let inputValue = choosenCity.value;
  let location = inputValue;

  let output = document.querySelector(".output");
  output.classList.add("outputOnclick");

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=7302873955924156a9d151922230908&q=${location}&aqi=yes`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);

    const giphyUrl = data.current.condition.icon;
    const text = data.current.condition.text;
    const time = data.location.localtime;
    const humidity = data.current.humidity;
    const wind = data.current.wind_degree;
    const pressure = data.current.pressure_in;
    const latitude = data.location.lat;

    const otherInfoElement = document.querySelector("#otherInfo");
    otherInfoElement.innerHTML = `
            <div class="weather-detail">
                <span class="weather-label">Humidity:</span> <span class="weather-value">${humidity}%</span>
            </div>
            <div class="weather-detail">
                <span class="weather-label">Wind:</span> <span class="weather-value">${wind}&deg;</span>
            </div>
            <div class="weather-detail">
                <span class="weather-label">Pressure:</span> <span class="weather-value">${pressure}inHg</span>
            </div>
            <div class="weather-detail">
                <span class="weather-label">Latitude:</span> <span class="weather-value">${latitude}&deg;</span>
            </div>
        `;

    const locationElement = document.querySelector("#location");
    location =
      location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
    locationElement.innerHTML = `${location}`;

    const localTime = document.querySelector("#timeZone");
    localTime.textContent = time;

    const descriptionElement = document.querySelector("#textDisplay");
    descriptionElement.textContent = text;

    const celciusElement = document.querySelector("#celciusDisplay");
    const celcius = data.current.temp_c;

    const fahrenheit = data.current.temp_f;

    const celciusBtn = document.querySelector("#celciusBtn");
    const fahrenheitBtn = document.querySelector("#fahneitBtn");

    celciusElement.innerHTML = `<p style="font-size: 50px; margin: 0px; padding: 0px">${celcius}</p> &deg;C`;

    const giphyDisplayElement = document.querySelector("#gifDisplay");
    giphyDisplayElement.src = giphyUrl;
    giphyDisplayElement.style.backgroundImage = `url(${giphyUrl})`;
    giphyDisplayElement.classList.add("Onclick");

    celciusBtn.addEventListener("click", () => {
      celciusElement.innerHTML = `<p style="font-size: 50px; margin: 0px; padding: 0px">${celcius}</p> &deg;C `;
    });

    fahrenheitBtn.addEventListener("click", () => {
      celciusElement.innerHTML = `<p style="font-size: 50px; margin: 0px; padding: 0px">${fahrenheit}</p> &deg;F`;
    });
  } catch (error) {
    console.log(error);
    // window.alert(`City chosen ${location}, was not found !!!!`);
  }
}

const searchBtn = document.querySelector("#search");
searchBtn.addEventListener("click", function () {
  getWeather();
  choosenCity.value = "";
});

choosenCity.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    getWeather();
    choosenCity.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  getWeather();
  choosenCity.value = "";
});
