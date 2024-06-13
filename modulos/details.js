let id = new URL(window.location.href).searchParams.get("id");
let container = document.getElementById("containerDetails");

fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then(response => response.json())
    .then(data => {
        for (let evento of data.events) {
            if (evento._id == id) {
                let tarjeta = document.createElement("div");
                tarjeta.className = "tarjeta card mb-3  justify-content-center";
                tarjeta.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-6 ">
                            <img src="${evento.image}" class="img-fluid h-100 object-fit-cover" alt="${evento.name}">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                                <h5 class="card-title">${evento.name}</h5>
                                <p class="card-text">Description: ${evento.description}</p>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><strong>Date:</strong> ${evento.date}</li>
                                    <li class="list-group-item"><strong>Category:</strong> ${evento.category}</li>
                                    <li class="list-group-item"><strong>Place:</strong> ${evento.place}</li>
                                    <li class="list-group-item"><strong>Capacity:</strong> ${evento.capacity}</li>
                                    <li class="list-group-item"><strong>Price:</strong> ${evento.price}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
                container.appendChild(tarjeta);
                break; 
            }
        }
    })
    .catch(error => console.error('no ay nada que mostrar', error));
