import fetch from 'node-fetch';

export const handler = async (event) => {
  const { firstName, lastName, email, phone, organizationName, label_names } = JSON.parse(event.body);

  const requestBody = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    organization_name: organizationName,
    label_names: label_names,
  };

  try {
    const response = await fetch('https://api.apollo.io/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'kyW8x396g0wn6U2ka72pRA', // Replace with your actual API key
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    console.log("Raw Apollo Response:", responseData);

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Allow all origins for CORS
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: responseData }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow all origins for CORS
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow all origins for CORS
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Unexpected error', message: error.message }),
    };
  }
};
