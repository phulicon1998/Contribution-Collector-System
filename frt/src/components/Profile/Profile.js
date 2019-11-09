import React, { Component } from "react";
import {
  Row,
  Col
} from "react-bootstrap";

import Card from "../Card/Card.jsx";
import FormInputs from "../FormInputs/FormInputs.jsx";
import UserCard from "../Card/UserCard.jsx";
import Button from "../CustomButton/CustomButton.jsx";

import avatar from "../../assets/img/default-avatar.png";

class UserPage extends Component {
  render() {
    return (
      
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Display name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: "Creative Code"                        
                        }                
                        
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-7", "col-md-5"]}
                      proprieties={[
                        {
                          label: "Faculty",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Faculty",
                          defaultValue: "Information technology",
                          disabled: true
                        },
                        {
                          label: "Lecturer",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Lecturer",
                          defaultValue: "Andrew",
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Email address (disabled)",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: "abc@gmail.com",
                          disabled: true
                        }
                      ]}
                    />  
                   
                    <div className="col-md-12">
                      <div>
                      <Button bsStyle="success" pullRight fill type="link">
                        Change password
                      </Button>
                      </div>
                      <div className="col-md-10">
                        <Button bsStyle="primary" pullRight fill type="submit">
                          Change profile
                        </Button>
                      </div>
                    </div>

                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name="Creative Code"
                userName="abc@gmail.com"
                description={
                  <span>
                    "You're upload
                    <br />
                    16 images
                    <br />
                    15 words
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="pe-7s-id" /> <span className="text-primary"> Change your avatar</span>
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
    
    );
  }
}

export default UserPage;


