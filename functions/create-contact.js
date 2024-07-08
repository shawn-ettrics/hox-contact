const APOLLO_API_KEY = "F1ylxgjzNqFcVmrxp7XNWQ";

exports.handler = async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: ''
        };
    }

    try {
        console.log('Event Body:', event.body);
        const fetch = await import('node-fetch').then(mod => mod.default);

        const { "first-name": firstName, "last-name": lastName, email, phone, "organization_name": organizationName, label_names, message } = JSON.parse(event.body);

        console.log('Parsed Data:', { firstName, lastName, email, phone, organizationName, label_names, message });

        const response = await fetch('https://api.apollo.io/v1/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Api-Key': APOLLO_API_KEY
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                organization_name: organizationName,
                label_names,
                message // Attempt to include the message field
            })
        });

        const text = await response.text();
        console.log('Raw Apollo Response:', text);

        const data = JSON.parse(text);
        console.log('Apollo Response:', data);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error:', error.message);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
