
function handleSignupSubmit(e, email, password) {
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

export default handleSignupSubmit