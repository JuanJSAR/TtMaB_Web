const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
	console.log('pass1');
    const { url } = req.body;
	// console.log('Cuerpo de la solicitud como texto:', url);

	console.log('pass2');
    if (!url || !url.startsWith('https://drive.google.com/')) {
      throw new Error('URL de Google Drive no válida');
    }

	console.log('pass3');
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('No se pudo obtener el recurso de Google Drive');
    }

	console.log('pass4');
    const data = await response.buffer();

	console.log('pass5');
    // Devuelve el archivo binario directamente
    res.status(200).send(data.toString('base64')); // Aquí no es necesario JSON.stringify
    res.setHeader('Content-Type', response.headers.get('Content-Type')); // Utiliza el Content-Type original del archivo
    res.setHeader('Content-Disposition', 'attachment; filename="AssetBundle"');
	
  } catch (error) {
    res.status(500).json({
      error: error.message,
	  reqbody: req.body
    });
  }
};