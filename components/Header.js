import { Col, Row } from 'reactstrap'
import Title from './Title'
import Link from 'next/link'
import cookie from 'js-cookie'
import useSWR from 'swr'

const Header = () => {
  const { data, revalidate } = useSWR('/api/me', async function (args) {
    const res = await fetch(args)
    const data = res.json()

    return data;
  })
  let loggedIn = false

  if (!data) {
    console.log('no data')
  } else if (data.userId) {
    loggedIn = true;
  }

  return (
    <Row className="mb-2 mt-sm-2">
      <Col sm="3"></Col>
      <Col className="text-center" sm="6">
        <Title copy="Tydii" role="heading" />
      </Col>
      <Col sm="3">
        {loggedIn &&
          <Row>
            <Col className='d-flex flex-column'>
              <span>Welcome back!</span>
              <Link href='/'>
                <a>
                  <button
                    onClick={() => {
                      cookie.remove('token')
                      revalidate()
                    }}
                  >
                    Logout
                  </button>
                </a>
              </Link>
            </Col>
          </Row>
        }
      </Col>
    </Row>
  )
}

export default Header
