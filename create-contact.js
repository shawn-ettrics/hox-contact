const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { first_name, last_name, email, phone, interest, message } = JSON.parse(event.body);

  const response = await fetch('https://api.apollo.io/v1/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.APOLLO_API_KEY}` // Use environment variables for sensitive data
    },
    body: JSON.stringify({ 
      first_name, 
      last_name, 
      email, 
      phone, 
      custom_fields: {
        interest,
        message
      }
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
