const axios = require('axios');
const crypto = require('crypto');

const hashData = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

const accessToken = 'YOUR_ACCESS_TOKEN';
const pixelId = 'YOUR_PIXEL_ID';
const apiUrl = `https://graph.facebook.com/v12.0/${pixelId}/events`;

const event = {
  event_name: 'Purchase',
  event_time: Math.floor(new Date() / 1000),
  user_data: {
    em: hashData('user@example.com'),
    ph: hashData('1234567890'),
    // ... other user data parameters
  },
  custom_data: {
    currency: 'THB',  // Currency set to Thai Baht
    value: 1000.00    // The transaction value in Thai Baht
  },
  event_source_url: 'https://yourwebsite.com/product-page',  // The URL where the event occurred
  action_source: 'website'
};

axios.post(apiUrl, {
  data: [event],
  access_token: accessToken
}).then(response => {
  console.log('Event sent successfully:', response.data);
}).catch(error => {
  console.error('Error sending event:', error);
});
