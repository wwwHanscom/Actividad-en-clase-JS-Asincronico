import { getSalesCoffee } from './requirements.js';

const processSalesCoffee = async () => {
    const salesData = await getSalesCoffee();
    const tableElement = document.querySelector("#salesTable");
    
    if (!salesData || salesData.length === 0) {
        tableElement.innerHTML = "<thead><tr><th>No se encontraron datos de ventas</th></tr></thead>";
        return;
    }

    const headers = Object.keys(salesData[0]);
    
    let tableHTML = "<thead><tr>";
    headers.forEach(header => {
        tableHTML += `<th class="px-4 py-2 text-left">${header.toUpperCase()}</th>`;
    });
    tableHTML += "</tr></thead><tbody>";

    salesData.forEach(item => {
        tableHTML += "<tr class='border-b'>";
        headers.forEach(header => {
            let value = '';
            
            // CORRECCIÓN: Si la columna es la de la imagen, creamos la etiqueta <img>
            if (header.toLowerCase() === 'image') {
                value = `<img src="${item[header]}" alt="${item['title'] || 'Coffee'}" class="w-16 h-16 object-cover rounded-md shadow-sm">`;
            } else {
                // Si es un arreglo (como los ingredientes), los une con comas, si no, usa el valor normal
                value = Array.isArray(item[header]) ? item[header].join(", ") : item[header];
            }
            
            tableHTML += `<td class="px-4 py-2 align-middle">${value || ''}</td>`;
        });
        tableHTML += "</tr>";
    });
    tableHTML += "</tbody>";

    tableElement.innerHTML = tableHTML;

    // Inicializar Simple-DataTables
    new window.simpleDatatables.DataTable("#salesTable", {
        searchable: true,
        fixedHeight: true,
        perPage: 5
    });
};

processSalesCoffee();