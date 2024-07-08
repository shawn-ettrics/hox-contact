const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    console.log('Event Body:', event.body);
    console.log('Parsed Data:', data);

    // Create the contact with the custom field
    const response = await fetch('https://api.apollo.io/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': process.env.APOLLO_API_KEY
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        organization_name: data.organizationName,
        label_names: data.label_names,
        typed_custom_fields: {
          webform_message: data.message // using the custom field created
        }
      })
    });

    const result = await response.json();
    console.log('Raw Apollo Response:', result);

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ success: false, message: result.message })
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Internal Server Error' })
    };
  }
};
