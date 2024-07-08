const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { firstName, lastName, email, phone, organizationName, label_names, message } = JSON.parse(event.body);

    const contactData = {
      first_name: firstName,
      last_name: lastName,
      email,
      organization_name: organizationName,
      phone,
      label_names,
      typed_custom_fields: {
        "668c2a9462dd94078939da01": message
      }
    };

    const url = "https://api.apollo.io/v1/contacts";
    const apiKey = "F1ylxgjzNqFcVmrxp7XNWQ";
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "X-Api-Key": apiKey
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(contactData)
    });

    const rawResponseText = await response.text();
    console.log("Apollo Response:", rawResponseText);

    const data = JSON.parse(rawResponseText);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      },
      body: JSON.stringify({ success: true, data })
    };
  } catch (error) {
    console.error("Error:", error.message);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      },
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
