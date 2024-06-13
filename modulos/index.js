import { createTarjetas, createCheckbox } from "./module.js";

let data;

fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("ups ay un problemita con la red");
        }
        return response.json();
    })
    .then(jsonData => {
        data = jsonData;
        let containerTarjetas = document.getElementById("padreTarjetas");

        for (let index = 0; index < data.events.length; index++) {
            createTarjetas(containerTarjetas, data.events[index]);
        }

        let containerCheckbox = document.getElementById("padreCheckbox");

        let categories = [];
        data.events.forEach(event => {
            if (!categories.includes(event.category)) {
                categories.push(event.category);
            }
        });
        categories.forEach(category => {
            createCheckbox(containerCheckbox, category);
        });

        containerCheckbox.addEventListener('change', function(event) {
            let buscarCategorias = Array.from(document.querySelectorAll('input[name="categoryOptions"]:checked')).map(checkbox => checkbox.value);
            
            let filtrarEventos;
            if (buscarCategorias.length > 0) {
                filtrarEventos = data.events.filter(event => buscarCategorias.includes(event.category));
            } else {
                filtrarEventos = data.events; 
            }
            
            containerTarjetas.innerHTML = "";
            
            filtrarEventos.forEach(event => {
                createTarjetas(containerTarjetas, event); 
            });
        });

        document.querySelector('input[type="search"]').addEventListener('input', updateDisplayedEvents);
        containerCheckbox.addEventListener('change', updateDisplayedEvents);
    })
    .catch(error => {
        console.error("tenemos problemas no lo seeee", error);
    });

function updateDisplayedEvents() {
    let buscarTexto = document.querySelector('input[type="search"]').value.trim();
    let buscarCategorias = Array.from(document.querySelectorAll('input[name="categoryOptions"]:checked')).map(checkbox => checkbox.value);

    let filtrarEventos;
    if (buscarCategorias.length > 0) {
        filtrarEventos = filterEvents(buscarTexto, buscarCategorias);
    } else {
        filtrarEventos = filterEvents(buscarTexto, categories);
    }

    containerTarjetas.innerHTML = "";

    filtrarEventos.forEach(event => {
        createTarjetas(containerTarjetas, event); 
    });
}

function filterEvents(buscarTexto, buscarCategorias) {
    let filteredByCategories = data.events.filter(event => buscarCategorias.includes(event.category));
   
    if (buscarTexto.trim() !== "") {
        return filteredByCategories.filter(event => event.name.toLowerCase().includes(buscarTexto.toLowerCase()));
    } else {
        return filteredByCategories;
    }
} 
