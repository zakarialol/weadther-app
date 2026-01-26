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
        console.log('type a city name')
        errorMessagefunc('type a city name')
        return
    }
    getWeatherBycity(city,e)
})
// adding event on the localization
localizationBtn.addEventListener('click',()=>{
    console.log('you just prest the lozalization button ')
})