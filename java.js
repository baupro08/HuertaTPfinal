
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue, off } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
    
    apiKey: "AIzaSyCrB4xgCBRmpujDcvOOihSVZ6MIFOPE56M",

    authDomain: "proyectoclase1-2025.firebaseapp.com",

    databaseURL: "https://huertamaxi2025-default-rtdb.firebaseio.com",

    projectId: "proyectoclase1-2025",

    storageBucket: "proyectoclase1-2025.firebasestorage.app",

    messagingSenderId: "822869341917",

    appId: "1:822869341917:web:8d4d76a6493df78963cd34"

};



const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const sensoresRef = ref(db, "/");

onValue(sensoresRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Datos recibidos desde Firebase:", data);
});


function actualizarSemaforo(idSemaforo, color) {
    const semaforo = document.getElementById(idSemaforo);
    const luces = semaforo.querySelectorAll(".luz");

    luces.forEach(luz => luz.classList.remove("encendida"));

    if (color === "rojo")
        luces[0].classList.add("encendida");
    else if (color === "amarillo")
        luces[1].classList.add("encendida");
    else if (color === "verde")
        luces[2].classList.add("encendida");
}




onValue(ref(db, "/humedadSuelo"), (snapshot) => {
    const valor = snapshot.val();
    document.getElementById("msg-suelo").textContent = valor + "%";

    if (valor < 30) actualizarSemaforo("semaforo-suelo", "rojo");
    else if (valor < 60) actualizarSemaforo("semaforo-suelo", "amarillo");
    else actualizarSemaforo("semaforo-suelo", "verde");
});


onValue(ref(db, "/humedadAire"), (snapshot) => {
    const valor = snapshot.val();
    document.getElementById("msg-aire").textContent = valor + "%";

    if (valor < 30) actualizarSemaforo("semaforo-aire", "rojo");
    else if (valor < 60) actualizarSemaforo("semaforo-aire", "amarillo");
    else actualizarSemaforo("semaforo-aire", "verde");
});




onValue(ref(db, "/temperatura"), (snapshot) => {
    const valor = snapshot.val();
    document.getElementById("msg-temp").textContent = valor + "°C";

    if (valor < 25) actualizarSemaforo("semaforo-temp", "verde");
    else if (valor < 35) actualizarSemaforo("semaforo-temp", "amarillo");
    else actualizarSemaforo("semaforo-temp", "rojo");
});
