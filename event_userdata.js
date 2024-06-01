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
    ge: hashData('m'),
    db: hashData('19900101'),
    ln: hashData('Doe'),
    fn: hashData('John'),
    ct: hashData('San Francisco'),
    st: hashData('CA'),
    zp: hashData('94107'),
    country: hashData('US'),
    external_id: 'unique_user_id',
    client_ip_address: '192.168.0.1',
    client_user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    fbc: 'fbclid=IwAR0...',
    fbp: 'fb.1.1558571054389.1098115397'
  },
  custom_data: {
    currency: 'usd',
    value: 30.00
  },
  event_source_url: 'https://yourwebsite.com',
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
