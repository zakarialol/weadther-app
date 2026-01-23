//selection elementss 
const imageHolder = document.querySelector('[data-img="weatherSvg"]')
const celsiusHolder = document.querySelector('[data-dogry-value="dogry-value"]')
const dogryLetter = document.querySelector('[data-sup-value="sup-value"]')
const conditionText = document.querySelector('[data-weader-condition-text="weader-condition"]')
const supTextLetter = document.querySelector('[data-sup-value="sup-value"]')
const weatherMomentsBytHours = document.querySelector('[data-weather-moments="weather-moments-main-div"]')
import { weaderCity } from "./api.js";
//
export async function gettime(){
    const dataJson = await weaderCity('khemisset')
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
    // const weathercode = weather.weathercode[currentIndex]
    // const isDay = weather.is_day[currentIndex]
    // let currentLWeathere = getWeatherCondition(weathercode,isDay)
    //
    // const tomperater = weather.temperature_2m[currentIndex]
    //function to get info about weather
    ArrayAboutWeatherInfoFunc(dataJson,currentIndex)
    // putingInfoInTherePlaceFunc(currentWeathere,tomperater)
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
function putingInfoInTherePlaceFunc(finalWeatherArray){
  //fit current image
  imageHolder.src = `/img/${finalWeatherArray[0].weathercondition}.svg`
  celsiusHolder.innerHTML = `${finalWeatherArray[0].temp}&deg`
  //
  const withercondition = finalWeatherArray[0].weathercondition.replaceAll('-',' ')
  conditionText.textContent = withercondition
  supTextLetter.textContent = 'c'
  //creating html for the other hours
  let finalHtml = htmlFunc(finalWeatherArray)
  weatherMomentsBytHours.innerHTML = finalHtml
  console.log(finalHtml,'finalhtml')
}
//genirating html for weather moments
function htmlFunc(finalWeatherArray){
  let html =''
  finalWeatherArray.slice(1).forEach((itm,index)=>{
    html += `<div data-moment="${itm-index}" class='w-14 text-center'>
                    <p class ='text-[10px]'>${itm.time}</p>
                    <div><img src="/img/${itm.weathercondition}.svg" alt=""></div>
                    <p class='text-[10px]'>${itm.temp}&deg</p>
                    <p class='whitespace-nowrap text-[8px]'>${itm.date}</p>
            </div>`
  })
  return html;
}
// function about 
function ArrayAboutWeatherInfoFunc(datajson,currentIndex){
  //loop
  let finalWeatherArray = []
  let j = 0;
  console.log('currentindex indie the arrayabout',currentIndex)
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
  console.log(finalWeatherArray)
  putingInfoInTherePlaceFunc(finalWeatherArray)
}
