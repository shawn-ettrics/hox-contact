const fetch = require('node-fetch');

const APOLLO_API_KEY = "F1ylxgjzNqFcVmrxp7XNWQ";

exports.handler = async (event, context) => {
  const { first_name, last_name, email, phone, interest, message, label_names } = JSON.parse(event.body);

  const response = await fetch('https://api.apollo.io/v1/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${APOLLO_API_KEY}`
    },
    body: JSON.stringify({ 
      first_name, 
      last_name, 
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
    body: JSON.stringify(data)
  };
};
