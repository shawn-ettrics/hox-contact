const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const data = JSON.parse(event.body);
    const contactData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      organization_name: data.organizationName,
      label_names: data.label_names,
      typed_custom_fields: {
        "YOUR_CUSTOM_FIELD_ID": data.message // Replace YOUR_CUSTOM_FIELD_ID with the actual custom field ID
      }
    };

    const response = await fetch('https://api.apollo.io/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': 'YOUR_API_KEY'
      },
      body: JSON.stringify(contactData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Apollo Response:', result);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Contact created successfully!' })
      };
    } else {
      console.error('Error creating contact:', result);
      return {
        statusCode: response.status,
        body: JSON.stringify({ success: false, message: result.message || 'Error creating contact' })
      };
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Internal Server Error' })
    };
  }
};
