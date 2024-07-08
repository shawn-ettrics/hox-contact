// Create the Netlify function
const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { firstName, lastName, email, phone, organizationName, label_names, message } = JSON.parse(event.body);

    // Apollo API key and custom field ID
    const apiKey = "F1ylxgjzNqFcVmrxp7XNWQ";
    const customFieldId = "668c2a9462dd94078939da01"; // ID for webform_message

    const response = await fetch("https://api.apollo.io/v1/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        organization_name: organizationName,
        label_names: label_names,
        typed_custom_fields: {
          [customFieldId]: message
        }
      })
    });

    const data = await response.json();

    // Log Apollo response
    console.log("Apollo Response:", JSON.stringify(data));

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: data.message || "Failed to create contact" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Contact created successfully", data })
    };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error: error.message })
    };
  }
};
