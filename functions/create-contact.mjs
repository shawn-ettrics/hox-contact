// Rename the file to create-contact.mjs

export async function handler(event, context) {
    const fetch = await import('node-fetch').then(mod => mod.default);
  
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
          "668c2a9462dd94078939da01": data.message // Using the retrieved custom field ID
        }
      };
  
      const response = await fetch('https://api.apollo.io/v1/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Api-Key': 'kyW8x396g0wn6U2ka72pRA' // Use the new API key
        },
        body: JSON.stringify(contactData)
      });
  
      const text = await response.text();
      console.log('Raw Apollo Response:', text);
  
      const result = JSON.parse(text);
  
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
  