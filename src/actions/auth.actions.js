export async function login(username, password) {
  return fetch('https://api.codedigger.tech/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((data) => data.json())
}

export async function register(emailR, usernameR, passwordR) {
  return fetch(
    `https://api.codedigger.tech/auth/register/?redirect_url=${process.env.REACT_APP_SEND_EMAIL_RDURL}`,
    // `https://api.codedigger.tech/auth/register/?redirect_url=https://codedigger.tech/email-verified`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailR,
        username: usernameR,
        password: passwordR,
      }),
    }
  ).then((data) => data.json())
}

export async function auth_profile_update(
  name,
  codechef,
  codeforces,
  atcoder,
  spoj,
  uva_handle
) {
  return fetch('https://api.codedigger.tech/auth/profile/update/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      codechef,
      codeforces,
      atcoder,
      spoj,
      uva_handle,
    }),
  }).then((data) => data.json())
}

export async function setNewPass(password, token, uidb64) {
  return fetch('https://api.codedigger.tech/auth/password-reset-complete', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      token: token,
      uidb64: uidb64,
    }),
  }).then((data) => data.json())
}

export async function NewPassRequest(oldPass, NewPass, accessToken) {
  return fetch('https://api.codedigger.tech/auth/password-change/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      old_pass: oldPass,
      new_pass: NewPass,
    }),
  }).then((data) => data.json())
}
