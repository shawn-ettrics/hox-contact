const fetch = require('node-fetch');

exports.handler = async (event) => {
  const deploymentTimestamp = "4:28pm";
  const executionTimestamp = new Date().toISOString();

  console.log("Deployment Timestamp:", deploymentTimestamp);
  console.log("Execution Timestamp:", executionTimestamp);

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    };
  }

  try {
    console.log("Event headers:", event.headers);
    console.log("Event body:", event.body);

    if (!event.body) {
      throw new Error("Request body is empty");
    }

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

    console.log("Sending request to Apollo API:", url);
    console.log("Request headers:", headers);
    console.log("Request body:", contactData);

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(contactData)
    });

    const rawResponseText = await response.text();
    console.log("Raw Apollo Response:", rawResponseText);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      },
      body: JSON.stringify({ success: true, data: rawResponseText })
    };
  } catch (error) {
    console.error("Error:", error);

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
