let apiKey = "b2a5adcct04b33178913oc335f405433";

function formatDateTimeDescription(timestamp, description) {
  const date = new Date(timestamp * 1000);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}, ${description}`;
}

function updateWeather(data) {
  document.querySelector(".city").innerText = data.city;
  document.querySelector(".temp").innerText = `${Math.round(data.temperature.current)}°C`;
  document.querySelector(".humidity").innerText = `${data.temperature.humidity}%`;
  document.querySelector(".wind").innerText = `${data.wind.speed} km/h`;
  document.querySelector(".weather-icon").setAttribute("src", data.condition.icon_url);
  document.querySelector(".weather-icon").setAttribute("alt", data.condition.description);

  const dateTimeText = formatDateTimeDescription(data.time, data.condition.description);
  document.querySelector(".date-time-description").innerText = dateTimeText;
}

function getWeather(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl)
    .then(function (response) {
      updateWeather(response.data);  // ✅ Corrected this line
    })
    .catch(function (error) {
      alert("City not found. Please try another city.");
    });
}

document.querySelector("button").addEventListener("click", function () {
  let city = document.querySelector("input").value.trim();
  if (city) {
    getWeather(city);
  }
});

// Optional: Default city on load
getWeather("New York");
