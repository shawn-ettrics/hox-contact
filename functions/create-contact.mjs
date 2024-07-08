import fetch from 'node-fetch';

export async function handler(event, context) {
    try {
        const data = JSON.parse(event.body);

        const payload = {
            api_key: 'F1ylxgjzNqFcVmrxp7XNWQ',
            contact: {
                first_name: data['first-name'],
                last_name: data['last-name'],
                email: data.email,
                phone: data.phone,
                organization_name: data.organization,
                typed_custom_fields: {
                    '668c2a9462dd94078939da01': data.message // Custom field ID for webform_message
                },
                label_ids: ['668ba5ae217f7b0789c489d9'] // ID for investor_inquiry label
            }
        };

        const response = await fetch('https://api.apollo.io/v1/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Add CORS headers
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ success: true, data: result })
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Add CORS headers
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
}
