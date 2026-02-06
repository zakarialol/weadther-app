//selection elementss 
const imageHolder = document.querySelector('[data-img="weatherSvg"]')
const celsiusHolder = document.querySelector('[data-dogry-value="dogry-value"]')
const dogryLetter = document.querySelector('[data-sup-value="sup-value"]')
const conditionText = document.querySelector('[data-weader-condition-text="weader-condition"]')
const supTextLetter = document.querySelector('[data-sup-value="sup-value"]')
const weatherMomentsBytHours = document.querySelector('[data-weather-moments="weather-moments-main-div"]')
const weatherMainDiv = document.querySelector('[data-weather-main-div="data-weather-main-div"]')
const cityNameText = document.querySelector('[data-cityName="cityName"]')
const errorMessage = document.querySelector('[data-errMsg="error-message"]')
const errorMainDiv = document.querySelector('[data-errMsg="error-main-div"]')
import { weaderCity } from "./api.js";
//
let isloading = false;
export async function getWeatherBycity(city,e){
  if(isloading){
    e.preventDefault()
    return;
  };
  isloading=true;
  try{
    const dataJson = await weaderCity(city)
    //
    const weather = dataJson.data.hourly
    const cityName = dataJson.cityName
    //
    const date = new Date()
    const year = date.getFullYear()
    const month =String(date.getMonth()+1).padStart(2,'0')
    const day = String(date.getDate()).padStart(2,'0')
    const hour = String(date.getHours()).padStart(2,'0')
    const finalDate = `${year}-${month}-${day}T${hour}:00`
    let currentIndex = weather.time.indexOf(`${finalDate.trim()}`)
    //
    ArrayAboutWeatherInfoFunc(dataJson.data,currentIndex,cityName)
  }catch(e){
    console.log(e)
  }finally{
    isloading=false
  }
}
//
function ArrayAboutWeatherInfoFunc(datajson,currentIndex,cityName){
  //loop
  let finalWeatherArray = []
  let j = 0;
  for(let i = currentIndex ; i < datajson.hourly.time.length ; i++){
    j++;
    let isDay = datajson.hourly.is_day[i];
    let obj = {
      date: datajson.hourly.time[i].slice(0,-6),
      time: datajson.hourly.time[i].slice(-5),
      temp: Math.round(datajson.hourly.temperature_2m[i]),
      code: datajson.hourly.weathercode[i],
      weathercondition: getWeatherCondition(datajson.hourly.weathercode[i],isDay)
    }
    finalWeatherArray.push(obj)
    if(j >= 72) break;
  }
  putingInfoInTherePlaceFunc(finalWeatherArray,cityName)
}
function getWeatherCondition(code,isDay) {
        let dayci = isDay === 1 ? 'day': 'night';
        //clear nihgt or day
        if(code === 0){
            if(isDay === 1){
              return `clear-${dayci}`
            }else{
              return `clear-${dayci}`
            }
        }
        //partly-cloudy-day or night
        if(code === 1 || code === 2){
            if(isDay === 1){
              return `partly-cloudy-${dayci}`
            }else{
              return `partly-cloudy-${dayci}`
            }
        }
        //cloudy
        if(code === 3){
          return 'cloudy'
        }
        //rain
        if([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)){
          return 'rain'
        }
        // 4. Fog
        if ([45, 48].includes(code)) {
          return "fog"; 
        }
        // 2. Snow
        if ([71, 73, 75, 77, 85, 86].includes(code)) {
          return "snow";
        }
        // thunderStorm
        if (code >= 95){
            if(isDay === 1){
              return `thunderstorms-${dayci}-rain`
            }else{
              return `thunderstorms-${dayci}-rain`
            }
        }
        return "Unknown";
}
// function about 
// function to to make info in there place
function putingInfoInTherePlaceFunc(finalWeatherArray,cityName){
  //cityname place
  console.log(cityName)
  if(cityName.toLowerCase().trim()=== 'white house'){
    cityName = 'casablanca'
  }
  cityNameText.textContent = cityName
  //fit current image
  imageHolder.src = `img/${finalWeatherArray[0].weathercondition}.svg`
  celsiusHolder.innerHTML = `${finalWeatherArray[0].temp}&deg`
  //
  const withercondition = finalWeatherArray[3].weathercondition.replaceAll('-',' ').replaceAll('day','').replaceAll('night','').trim();
  conditionText.textContent = withercondition
  supTextLetter.textContent = 'c'
  //creating html for the other hours
  let finalHtml = htmlFunc(finalWeatherArray)
  weatherMainDiv.classList.add('border-t')
  weatherMomentsBytHours.innerHTML = finalHtml
}
//genirating html for weather moments
function htmlFunc(finalWeatherArray){
  let html =''
  finalWeatherArray.slice(1).forEach((itm,index)=>{
    html += `<div data-moment="${itm-index}" class='w-14 text-center'>
                    <p class ='text-sm'>${itm.time}</p>
                    <div><img src="img/${itm.weathercondition}.svg" alt=""></div>
                    <p class='text-sm'>${itm.temp}&deg</p>
                    <p class='whitespace-nowrap text-[10px]'>${itm.date}</p>
            </div>`
  })
  return html;
}
//
export function errorMessagefunc(msg){
  errorMessage.textContent = msg
  let heightOfMessage = errorMessage.scrollHeight
  errorMainDiv.style.height = heightOfMessage + 'px'
  setTimeout(() => {
    errorMainDiv.style.height = 0 + 'px'
  }, 2000);
}

