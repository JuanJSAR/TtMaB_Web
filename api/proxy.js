const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {	
    const { url } = req.body;

    if (!url || !url.startsWith('https://drive.google.com/')) {
      throw new Error('URL de Google Drive no válida');
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('No se pudo obtener el recurso de Google Drive');
    }

    const data = await response.buffer();

	 // Configura los encabezados de respuesta
    res.setHeader('Content-Type', response.headers.get('Content-Type')); // Utiliza el Content-Type original del archivo
	// res.setHeader('Content-Type', 'application/octet-stream'); // Establece el tipo de contenido como application/octet-stream
    res.setHeader('Content-Disposition', 'attachment; filename="AssetBundle"');

	console.log('pass');
    // Envía la respuesta al cliente
    res.status(200).send(data); // Aquí no es necesario JSON.stringify
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};