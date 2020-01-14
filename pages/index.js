import React, { useState } from 'react';
import '../styles/style.css';
import {
  Badge,
  Col,
  Row,
  Popover,
  PopoverBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import useItemState from '../components/useItemState';
import DecisionTable from '../components/DecisionTable';
//  import useItemState from '../components/useItemStateImmer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Index() {
  const { items, addItem, deleteItem, updateItem } = useItemState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [donateDropdownOpen, setDonateDropdownOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);

  const donateDropToggle = () => setDonateDropdownOpen(prevState => !prevState);
  const sellDropToggle = () => setSellDropdownOpen(prevState => !prevState);

  const popToggle = () => setPopoverOpen(!popoverOpen);

  return (
    <Layout>
      <base target="_blank" />
      <Row>
        <Col className="align-items-center" md="3">
          <Badge color="info" id="Popover1">
            How do I use this?
          </Badge>
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="Popover1"
            toggle={popToggle}
          >
            <PopoverBody>
              Add items you're unsure of getting rid of. Rate them based on how
              happy they make you. Click 'Analyze' when you're done to see what
              you need to part ways with
            </PopoverBody>
          </Popover>
        </Col>
        <Col className="align-items-center" md="6">
          <ItemForm
            saveItem={itemText => {
              const trimmedText = itemText.trim();

              if (trimmedText.length > 0) {
                addItem(trimmedText);
              }
            }}
          />
          <ItemList
            items={items}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
          <DecisionTable items={items} />
        </Col>
        <Col md="3">
          <h4>Resources</h4>
          <Dropdown isOpen={donateDropdownOpen} toggle={donateDropToggle}>
            <DropdownToggle caret>How do I donate my stuff?</DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="a" href="https://www.goodwill.org/locator/">
                Find your local Goodwill
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                tag="a"
                href="https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=335"
              >
                Guide to donating noncash items
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={sellDropdownOpen} toggle={sellDropToggle}>
            <DropdownToggle caret>How do I sell my stuff?</DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag="a"
                href="https://www.ebay.com/help/selling/selling-guides-tips/selling?id=4081"
              >
                Guide to selling on Ebay
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                tag="a"
                href="https://www.facebook.com/marketplace/learn-more/"
              >
                Guide to selling on Facebook Marketplace
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </Layout>
  );
}
