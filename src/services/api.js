import fetch from 'request-promise';

function api(resource, method, body) {
  const requestObject = {
    uri: `http://localhost:10001/api/${resource}`,
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    json: true
  };

  if (method === 'POST' || method === 'PUT') requestObject.body = body;

  return fetch(requestObject);
}

const verbs = ['GET', 'POST', 'DELETE', 'PUT'];

verbs.forEach( function (verb) {
  api[verb.toLowerCase()] = (resource, body) => api(resource, verb, body)
});

export default api;