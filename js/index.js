import { getSalesCoffee } from './requirements.js';

const processSalesCoffee = async () => {
    // 1. Obtener los datos asíncronos
    const salesData = await getSalesCoffee();
    
    // 2. Mapear o estructurar los datos para la tabla si es necesario
    // Suponiendo que la API de muestra devuelve objetos con { title, description, ingredients }
    const tableBody = document.querySelector("#salesTable");
    
    if (salesData.length === 0) {
        tableBody.innerHTML = "<thead><tr><th>No se encontraron datos</th></tr></thead>";
        return;
    }

    // Crear encabezados dinámicos basados en las llaves del primer objeto
    const headers = Object.keys(salesData[0]);
    let headerHTML = "<thead><tr>";
    headers.forEach(header => {
        headerHTML += `<th class="px-4 py-2 text-left">${header.toUpperCase()}</th>`;
    });
    headerHTML += "</tr></thead>";

    // Crear filas de datos
    let rowsHTML = "<tbody>";
    salesData.forEach(item => {
        rowsHTML += "<tr class='border-b'>";
        headers.forEach(header => {
            // Manejar si el valor es un arreglo (como los ingredientes)
            const value = Array.isArray(item[header]) ? item[header].join(", ") : item[header];
            rowsHTML += `<td class="px-4 py-2">${value}</td>`;
        });
        rowsHTML += "</tr>";
    });
    rowsHTML += "</tbody>";

    // Insertar en el HTML
    tableBody.innerHTML = headerHTML + rowsHTML;

    // 3. Inicializar el componente DataTable sobre la estructura generada
    new simpleDatatables.DataTable("#salesTable", {
        searchable: true,
        fixedHeight: true,
        perPage: 5
    });

    salesData.forEach(item => {
    tableHTML += "<tr class='border-b'>";
    headers.forEach(header => {
        let value = '';
        
        if (header === 'image') {
            // Renderiza la imagen en lugar de la URL en texto plano
            value = `<img src="${item[header]}" alt="${item['title']}" class="w-16 h-16 object-cover rounded">`;
        } else {
            value = Array.isArray(item[header]) ? item[header].join(", ") : item[header];
        }
        
        tableHTML += `<td class="px-4 py-2 align-middle">${value || ''}</td>`;
    });
    tableHTML += "</tr>";
});
};



// Ejecutar la función luego de cargarse por completo el DOM de la página
document.addEventListener("DOMContentLoaded", processSalesCoffee);