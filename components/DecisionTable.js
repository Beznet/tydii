import React, { useState } from 'react'
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap'
import Link from 'next/link'

const DecisionTable = ({ items, loggedIn, userData }) => {
  const [toggled, setToggle] = useState(false)
  const toggle = () => setToggle(!toggled)
  const [saveError, setSaveError] = useState('')

  let donateArray = []
  donateArray = items.filter(item => item.rating <= 3)

  console.log(donateArray)

  const donateResults = !donateArray.length
    ? 'You enjoy everying, think a bit harder :)'
    : donateArray.map(item => (
        <Col xs="12" className="mb-2 decision-text">
          <h4>{item.name.toUpperCase()}</h4>
        </Col>
      ))


  function handleSubmit(e) {
    e.preventDefault()
    fetch('/api/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userData.userId,
        list: donateArray
      }),
    })
      .then((r) => r.json())
  }

  return (
    <Row>
      <Col className="text-center mt-3">
        {!toggled ? (
          <button
            id="tydi-button"
            type="submit"
            onClick={() => {
              setToggle(!toggled)
            }}
          >
            Tydi Up!
          </button>
        ) : (
          <Spinner color="hsl(249, 13%, 30.2%)" />
        )}
        <Modal
          isOpen={toggled}
          centered
          modalTransition={{ timeout: 500 }}
          backdropTransition={{ timeout: 500 }}
          toggle={toggle}
          className=""
        >
          <ModalHeader className="justify-content-center">
            <Row>
              <Col xs="12" className="d-inline-flex">
                <img
                  className="flipped-sweep broom"
                  alt="broom sweeping"
                  src="/sweep.png"
                />
                <h2 className="rid-text mx-2 text-center">
                  Get rid of these items
                </h2>
                <img className="broom" alt="broom sweeping" src="/sweep.png" />
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody>
            <Col xs="12">
              <Row>
                <Col xs="12">
                  <Row className="text-center">{donateResults}</Row>
                </Col>
                <Col className="quote text-center mt-5" xs="12">
                  “It is the preoccupation with possessions that prevents us
                  from living freely and nobly.”
                  <Col className="blockquote-footer" xs="12">
                    Bertrand Russell
                  </Col>
                </Col>
              </Row>
            </Col>
          </ModalBody>
          <ModalFooter className="justify-content-center">
            <button type='submit' onClick={handleSubmit}>Save</button>
          </ModalFooter>
        </Modal>
      </Col>
    </Row>
  )
}

export default DecisionTable
