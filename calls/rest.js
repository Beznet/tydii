
export function handleSignupSubmit(e, email, password) {
  e.preventDefault()
  let data = fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    })
  })
  return data
}

export function handleLoginSubmit (e, email, password) {
  e.preventDefault()
  let data = fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  return data
}