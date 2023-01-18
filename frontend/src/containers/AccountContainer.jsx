import React, { Component } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Api from "../Api.json";
import { NotificationManager } from "react-notifications";

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        owner: "",
        balance: "",
        currency: "",
      },
      currencyOptions: ["EURO", "DOLLAR"],
    };
    this.handleBalance = this.handleBalance.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleBalance(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({ newUser: { ...prevState.newUser, balance: value } }),
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({ newUser: { ...prevState.newUser, [name]: value } }),
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.newUser.owner === "") {
      NotificationManager.error("Please fill in name.", "Alert", 5000);
      return;
    } else if (this.state.newUser.balance === "") {
      NotificationManager.error("Please fill in balance.", "Alert", 5000);
      return;
    } else if (this.state.newUser.currency === "") {
      NotificationManager.error("Please fill in currency.", "Alert", 5000);
      return;
    }
    let userData = this.state.newUser;
    let link = Api.Api + "accounts";
    fetch(link, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        if (data != null) {
          NotificationManager.success(
            "Account has been successfully created.",
            "Success",
            5000
          );
          this.setState({ newUser: { owner: "", balance: "", currency: "" } });
        }
      });
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        owner: "",
        balance: "",
        currency: "",
      },
    });
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input
          inputType={"text"}
          title={"Owner"}
          name={"owner"}
          value={this.state.newUser.owner}
          placeholder={"Enter your name"}
          handleChange={this.handleInput}
        />
        <Input
          inputType={"number"}
          name={"balance"}
          title={"Balance"}
          value={this.state.newUser.balance}
          placeholder={"Enter your balance"}
          handleChange={this.handleBalance}
        />
        <Select
          title={"Currency"}
          name={"currency"}
          options={this.state.currencyOptions}
          value={this.state.newUser.currency}
          placeholder={"Select currency"}
          handleChange={this.handleInput}
        />
        <Button
          id={"accountsubmit"}
          action={this.handleFormSubmit}
          type={"btn btn-primary col-lg-offset-4"}
          title={"Submit"}
        />
        <Button
          id={"accountclear"}
          action={this.handleClearForm}
          type={"btn btn-secondary margin-5"}
          title={"Clear"}
        />
      </form>
    );
  }
}

export default AccountContainer;
