//selection elementss 
const imageHolder = document.querySelector('[data-img="weatherSvg"]')
const celsiusHolder = document.querySelector('[data-dogry-value="dogry-value"]')
console.log(celsiusHolder)
const dogryLetter = document.querySelector('[data-sup-value="sup-value"]')
const conditionText = document.querySelector('[data-weader-condition-text="weader-condition"]')
const supTextLetter = document.querySelector('[data-sup-value="sup-value"]')
console.log(dogryLetter,'supvalue')
console.log(imageHolder,'imageHolder')
// exporting function
import { weaderCity } from "./api.js";
//
export async function gettime(){
    const dataJson = await weaderCity('tangie')
    console.log(dataJson,'ddataJson')
    //
    const weather = dataJson.hourly
    //
    const date = new Date()
    const year = date.getFullYear()
    const month =String(date.getMonth()+1).padStart(2,'0')
    const day = String(date.getDate()).padStart(2,'0')
    const hour = String(date.getHours()).padStart(2,'0')
    const finalDate = `${year}-${month}-${day}T${hour}:00`
    let currentIndex = weather.time.indexOf(`${finalDate.trim()}`)
    //
    const weathercode = weather.weathercode[currentIndex]
    const isDay = weather.is_day[currentIndex]
    let currentWeathere = getWeatherCondition(weathercode,isDay)
    //
    const tomperater = weather.temperature_2m[currentIndex]
    putingInfoInTherePlaceFunc(currentWeathere,tomperater)
}
gettime()
//
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
// function to to make info in there place
function putingInfoInTherePlaceFunc(condition,tomperater){
  //fit current image
  imageHolder.src = `/img/${condition}.svg`
  celsiusHolder.innerHTML = `${tomperater}&deg`
  conditionText.textContent = condition
  supTextLetter.textContent = 'c'
}
