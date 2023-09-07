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
    return {
      statusCode: 200,
      body: JSON.stringify(data.toString('base64')),
      isBase64Encoded: true,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
