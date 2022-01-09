let  header = document.querySelector('.header');
let  navmenu = document.querySelector('.nav-menu');

navmenu.addEventListener('click',function(){
    header.classList.toggle('menu-open');
});

//Pocetna pretraga scroll
function scrollWin(x, y) {
  window.scrollBy(x, y);
}

//Video-btn show-hide
const slideValue = document.getElementById("slider-value");
const inputSlider = document.getElementById("Cena");
inputSlider.oninput = (function(){
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = (value/2);
  slideValue.classList.add("show");
     });
     inputSlider.onblur = (()=>{
    slideValue.classList.remove("show");   
});

// Kontakt forma stranica kontakt
const ContactForm = document.querySelector('.contactForm');
let ime = document.getElementById('ime');
let email = document.getElementById('email');
let naslov = document.getElementById('naslov');
let poruka = document.getElementById('poruka');
ContactForm.addEventListener('submit',(e) =>{
  e.preventDefault();
  let formData ={
    ime: ime.value,
    email: email.value,
    naslov: naslov.value,
    poruka: poruka.value
  }
  console.log(formData);
  let xhr = new XMLHttpRequest();
  xhr.open('POST','/kontakt');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onload = function(){
  console.log(xhr.responseText);
  if(xhr.responseText == 'success'){
    document.getElementById("form-message-success").style.display = 'block';
    ime.value ='';
    email.value ='';
    naslov.value='';
    poruka.value='';
  }else{
    document.getElementById("form-message-warning").style.display = 'block';
  }
}
    xhr.send(JSON.stringify(formData));
})
