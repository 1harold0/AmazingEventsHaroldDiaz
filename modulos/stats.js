fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then(response => response.json())
    .then(data => {
       
       let eventosFuturos = data.events.filter(evento => evento.date > data.currentDate);

       
       let eventosFuturosOrdenadosPorIngresos = eventosFuturos.sort((a, b) => (b.price * b.estimate) - (a.price * a.estimate));

       let eventosTopIngresosFuturos = eventosFuturosOrdenadosPorIngresos.slice(0, 5);

       let tablaFuturos = document.getElementById('tablaEventosFuturos');
        eventosTopIngresosFuturos.forEach(evento => {
           let ingresos = evento.price * evento.estimate;
           let porcentajeAsistencia = ((evento.estimate / evento.capacity) * 100).toFixed(2);
           let fila = `
                <tr>
                    <td>${evento.name}</td>
                    <td>$${ingresos}</td>
                    <td>${porcentajeAsistencia}%</td>
                </tr>
            `;
            tablaFuturos.innerHTML += fila;
        });

       let eventosPasados = data.events.filter(evento => evento.date < data.currentDate);

       
        let eventosPasadosOrdenadosPorIngresos = eventosPasados.sort((a, b) => (b.price * b.assistance) - (a.price * a.assistance));

      
        let eventosTopIngresosPasados = eventosPasadosOrdenadosPorIngresos.slice(0, 5);

        
        let tablaPasados = document.getElementById('tablaEventosPasados');
        eventosTopIngresosPasados.forEach(evento => {
            let ingresos = evento.price * evento.assistance;
            let porcentajeAsistencia = ((evento.assistance / evento.capacity) * 100).toFixed(2);
            let fila = `
                <tr>
                    <td>${evento.name}</td>
                    <td>$${ingresos}</td>
                    <td>${porcentajeAsistencia}%</td>
                </tr>
            `;
            tablaPasados.innerHTML += fila;
        });
    })
    .catch(error => console.error('error en los datos:', error));