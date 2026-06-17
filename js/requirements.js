const getSalesCoffee = async () => {
    // Reemplaza esta URL con el link exacto provisto en tu asignación si varía
    const url = 'https://api.sampleapis.com/coffee/hot'; 
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las ventas de café:", error);
        return [];
    }
};