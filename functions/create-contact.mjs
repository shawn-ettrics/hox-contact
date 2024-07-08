import fetch from 'node-fetch';

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    const apolloResponse = await fetch('https://api.apollo.io/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': 'your-new-api-key-here'
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        organization_name: data.organizationName,
        label_names: data.label_names,
        typed_custom_fields: {
          '668c2a9462dd94078939da01': data.message
        }
      })
    });

    const textResponse = await apolloResponse.text();
    console.log("Raw Apollo Response: ", textResponse);

    // Check if response is valid JSON
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(textResponse);
    } catch (error) {
      console.error("Invalid JSON response: ", textResponse);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid JSON response from Apollo API" })
      };
    }

    console.log("Apollo Response: ", jsonResponse);

    if (!apolloResponse.ok) {
      return {
        statusCode: apolloResponse.status,
        body: JSON.stringify({ error: jsonResponse })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: jsonResponse })
    };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
