import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDllEU7AG4Alvu8pPADt-TSlFMR5clNBj8",
    authDomain: "proyectogrupohuerta-9e970.firebaseapp.com",
    databaseURL: "https://proyectogrupohuerta-9e970-default-rtdb.firebaseio.com",
    projectId: "proyectogrupohuerta-9e970",
    storageBucket: "proyectogrupohuerta-9e970.firebasestorage.app",
    messagingSenderId: "104414144386",
    appId: "1:104414144386:web:da627197af20c48eb7119b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const sensoresRef = ref(db, "sensores/nodemcu01");

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




onValue(ref(db, "sensores/humedadSuelo"), (snapshot) => {
    const valor = snapshot.val();
    document.getElementById("msg-suelo").textContent = valor + "%";

    if (valor < 30) actualizarSemaforo("semaforo-suelo", "rojo");
    else if (valor < 60) actualizarSemaforo("semaforo-suelo", "amarillo");
    else actualizarSemaforo("semaforo-suelo", "verde");
});


onValue(ref(db, "sensores/humedadAire"), (snapshot) => {
    const valor = snapshot.val();
    document.getElementById("msg-aire").textContent = valor + "%";

    if (valor < 30) actualizarSemaforo("semaforo-aire", "rojo");
    else if (valor < 60) actualizarSemaforo("semaforo-aire", "amarillo");
    else actualizarSemaforo("semaforo-aire", "verde");
});




onValue(ref(db, "sensores/temperatura"), (snapshot) => {
    const valor = snapshot.val();
    document.getElementById("msg-temp").textContent = valor + "°C";

    if (valor < 25) actualizarSemaforo("semaforo-temp", "verde");
    else if (valor < 35) actualizarSemaforo("semaforo-temp", "amarillo");
    else actualizarSemaforo("semaforo-temp", "rojo");
});
