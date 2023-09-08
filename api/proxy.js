const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const { url } = JSON.parse(event.body);

    if (!url || !url.startsWith('https://drive.google.com/')) {
      throw new Error('URL de Google Drive no válida');
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('No se pudo obtener el recurso de Google Drive');
    }

    const data = await response.buffer();
    
    // Devuelve el archivo binario directamente
    return {
      statusCode: 200,
      body: data.toString('base64'), // Aquí no es necesario JSON.stringify
      isBase64Encoded: true,
      headers: {
        'Content-Type': response.headers.get('Content-Type'), // Utiliza el Content-Type original del archivo
        'Content-Disposition': `attachment; filename="AssetBundle "`,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
