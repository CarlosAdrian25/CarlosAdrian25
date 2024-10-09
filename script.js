const canvas = document.getElementById('exoplanetCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400; // Ajusta el ancho según sea necesario
canvas.height = 400; // Ajusta la altura según sea necesario
const backgroundImage = new Image();
backgroundImage.src = 'sp.png'; // Reemplaza con la ruta de tu imagen


document.getElementById('draw-btn').addEventListener('click', drawExoplanet);

function drawExoplanet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    const radius = 70; // Radio del exoplaneta
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Obtener colores seleccionados
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const color3 = document.getElementById('color3').value;
    const color4 = document.getElementById('color4').value;

    // Crear un degradado lineal de arriba a abajo
    const gradient = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX - radius, centerY + radius);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.33, color2);
    gradient.addColorStop(0.67, color3);
    gradient.addColorStop(1, color4);

    ctx.fillStyle = gradient; // Establecer el degradado como el estilo de llenado
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false); // Dibuja el exoplaneta
    ctx.fill();

    // Si se selecciona agregar luna
    if (document.getElementById('moon').checked) {
        ctx.fillStyle = '#f4f4f4'; // Color de la luna
        const moonDistance = 150;
        ctx.beginPath();
        ctx.arc(centerX + moonDistance, centerY - 70, radius / 2, 0, Math.PI * 2, false); // Dibuja la luna
        ctx.fill();
    }

    const planetName = document.getElementById('planet-name').value || 'Exoplaneta';
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(planetName, centerX, centerY + radius + 30);
}

document.getElementById('download-btn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'exoplaneta.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

backgroundImage.onload = function() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    drawExoplanet(); // Dibuja el exoplaneta después de que la imagen de fondo se haya cargado
};
// Inicializa el exoplaneta al cargar
drawExoplanet();
