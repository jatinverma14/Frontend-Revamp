export default async function getProblems(creds, queryStr) {
  return await fetch(`https://api.codedigger.tech/contest/${queryStr}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${creds.access}`,
    },
  }).then((data) => data.json())
}