
function handleSubmit(e, email, password) {
    e.preventDefault()
    console.log(email, password)
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

  export default handleSubmit