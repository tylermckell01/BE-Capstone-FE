export default async function asyncApiCall(
  api_endpoint,
  method = "GET",
  body = {},
  headers = null,
  authToken = null
) {
  const response = await fetch(api_endpoint, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });

  if (response) {
    const responseData = await response.json();
    console.log("async api call successful");
    console.log(response);
    return responseData;
  } else {
    console.error("async api call failed");
  }
}
