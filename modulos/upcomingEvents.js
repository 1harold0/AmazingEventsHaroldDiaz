import { createTarjetas, createCheckbox } from "./module.js";

let data;

fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("ups tenemos un problemta con la red"); 
        }
        return response.json();
    })
    .then(jsonData => {
        data = jsonData;
        let containerTarjetas = document.getElementById("padreTarjetas");

        for (let index = 0; index < data.events.length; index++) {
            let event = data.events[index];
            let eventDate = event.date;
            let currentDate = data.currentDate;

            if (eventDate > currentDate) { 
                createTarjetas(containerTarjetas, event);
            }
        }

        // Checkbox
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

        // Búsqueda
        document.querySelector('input[type="search"]').addEventListener('input', updateDisplayedEvents);
        containerCheckbox.addEventListener('change', updateDisplayedEvents);
    })
    .catch(error => {
        console.error("tenemos problemas con los datos", error); 
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
    let filteredByCategoriesAndDates = data.events.filter(event => {
        return buscarCategorias.includes(event.category) && event.date > data.currentDate;
    });

    if (buscarTexto.trim() !== "") {
        return filteredByCategoriesAndDates.filter(event => event.name.toLowerCase().includes(buscarTexto.toLowerCase()));
    } else {
        return filteredByCategoriesAndDates;
    }
}
