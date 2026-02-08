//selecting elementes from html 
const form = document.getElementById('form')
const searchInput = document.querySelector('[data-input="searchInput"]')
const localizationBtn = document.querySelector('[data-localization="localziation-Btn"]')
// importing functions
import "./api.js" ; import "./ui.js"
import { getWeatherBycity } from "./ui.js";
import { errorMessagefunc } from "./ui.js";
// adding event lestiner on the form when i search
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let city = searchInput.value.trim()
    let regex =/^[A-Za-z ]+$/
    if(!regex.test(city) || city === ''){
        errorMessagefunc('type valide city name')
        return
    }
    getWeatherBycity(city,e)
})
// adding event on the localization
localizationBtn.addEventListener('click',()=>{
    if(!navigator.geolocation){
        alert("this option isn't available")
    }
    navigator.geolocation.getCurrentPosition(
        async position=>{
        const latitude = position.coords.latitude
        const longtude = position.coords.longitude
        const apiKey = 'fd7e356cf6e90b608d91d08f082cf75c'
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtude}&appid=${apiKey}`
        const res = await fetch(url)
        const data = await res.json()
        const cityname = data.name
        searchInput.value = cityname
        getWeatherBycity(cityname)
    },
    (error)=>{
        console.log('error',error)
    },
    {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
    }
    )
})
// runing rabat as deafault value 
window.onload = ()=>{
    getWeatherBycity('rabat')
}