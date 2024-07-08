export async function handler(event, context) {
    const fetch = await import('node-fetch');
    const data = JSON.parse(event.body);
    const apolloApiKey = 'your-api-key'; // Replace with your Apollo API key
  
    const contactPayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      organization_name: data.organizationName,
      label_names: data.label_names,
      typed_custom_fields: {
        '668c2a9462dd94078939da01': data.message // Using the custom field ID for webform_message
      }
    };
  
    try {
      const response = await fetch.default('https://api.apollo.io/v1/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Api-Key': apolloApiKey
        },
        body: JSON.stringify(contactPayload)
      });
  
      const result = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, data: result })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: error.message })
      };
    }
  }
