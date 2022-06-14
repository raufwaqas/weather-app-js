let form = document.getElementById('input-form')
let input = document.getElementById('input-field')
let result = document.getElementById('results')
dayjs.extend(window.dayjs_plugin_utc)


let pass = "dacd6c7491c17f270db0d2a2cd854692"
let bsae = "https://api.openweathermap.org/data/2.5/weather"
let units = 'metric'
// let city = "London"

let api;
let fetched_result;


form.addEventListener('submit', (e) => {
  e.preventDefault()

  result.innerHTML = `<h5 class="text-center">Loading, please wait</h5>`
  fetch_data();
  input.value = ""

})


let fetch_data = async () => {
  let city = input.value
  api = `${bsae}?q=${city}&appid=${pass}&units=${units}`;
  return await fetch(api)
    .then((res) => {
      if (res.ok) { return res.json() }
      else {
        throw new Error('something went wrong, do not blame me')
      }

    })
    .then((res) => {
      console.log(res)
      result.innerHTML = print_results(res)
    })
    .catch(err => result.innerHTML = `<h5 class="text-center">City Not Found</h5>`)
}

// result.setAttribute('aria-label', `${input.value}`)

let print_results = (res) => {
  let { name, sys, weather, wind, main, timezone } = res
  return `<h4 class="text-center text-capitalize mb-3">${name}, ${sys.country}</h4>
  <div class="cards">
    <div class="card-1">
        <img src="http://openweathermap.org/img/wn/${weather.filter((item, index) => index === 0).map(item => item.icon)}@2x.png" alt="" />
      <span class="fs-6 fw-semibold"> ${main.temp} °C </span>
      <span class="fw-lighter text-secondary">Temprature</span>
    </div>
    <div class="card-2">
      <i class="fs-2 bi bi-wind"></i>
      <span class="fs-6 fw-semibold">${wind.speed} KM/H</span>
      <span class="fw-lighter text-secondary">Wind</span>
    </div>
    <div class="card-3">
      <i class="bi bi-droplet fs-2"></i> <span class="fs-6 fw-semibold"> ${main.humidity} %</span>
      <span class="fw-lighter text-secondary">Humidity</span>
    </div>
    <div class="card-4">
      <i class="bi bi-water fs-2"></i> <span class="fs-6 fw-semibold"> ${main.pressure} hPa</span>
      <span class="fw-lighter text-secondary">Presure</span>
    </div>
    <div class="card-5">
      <i class="bi bi-sunrise fs-2"></i> <span class="fs-6 fw-semibold">${hourConverter(sys.sunrise, timezone)} </span>
      <span class="fw-lighter text-secondary">Sunrise</span>
    </div>
    <div class="card-6">
      <i class="bi bi-sunset fs-2"></i>
      <span class="fs-6 fw-semibold"> ${hourConverter(sys.sunset, timezone)}</span>
      <span class="fw-lighter text-secondary">Sunset</span>
    </div>
  </div>`
}


let hourConverter = (input, timezone) => {
  return dayjs.unix(input).utc().utcOffset(timezone / 3600).format('h : mm A')

}