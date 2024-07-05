const APOLLO_API_KEY = "F1ylxgjzNqFcVmrxp7XNWQ";

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    };
  }

  try {
    const fetch = await import('node-fetch').then(mod => mod.default);

    const { "first-name": firstName, "last-name": lastName, email, phone, interest, message, label_names } = JSON.parse(event.body);

    const response = await fetch('https://api.apollo.io/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APOLLO_API_KEY}`
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        custom_fields: {
          interest,
          message
        },
        label_names
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
