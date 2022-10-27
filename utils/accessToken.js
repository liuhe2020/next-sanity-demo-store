export default async function generateAccessToken(id, secret, base) {
  const auth = Buffer.from(id + ':' + secret).toString('base64');
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}
