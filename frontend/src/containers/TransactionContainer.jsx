import React, { Component } from "react";
import Input from "../components/Input";
import Select from "../components/TransactionSelect";
import Button from "../components/Button";
import Api from "../Api.json";
import { NotificationManager } from "react-notifications";

class TransactionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: {
        source: "",
        destination: "",
        amount: "",
      },
      accounts: [],
      selectedSourceCur: "",
      currencyOptions: ["EURO", "DOLLAR"],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleDestInput = this.handleDestInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.fetchAccounts();
  }

  fetchAccounts() {
    fetch(Api.Api + "accounts?page=0&size=100", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        data.forEach((item) =>
          this.state.accounts.push(
            this.setState({
              accounts: this.state.accounts.concat(
                item.owner +
                  "," +
                  item.id +
                  "," +
                  item.balance +
                  "," +
                  item.currency
              ),
            })
          )
        );
      });
    });
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    let curr = value.split(",")[3];
    this.setState((prevState) => ({
      transaction: { ...prevState.transaction, [name]: value },
      selectedSourceCur: { curr },
    }));
  }
  handleDestInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({
        transaction: { ...prevState.transaction, [name]: value },
      })
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state;
    if (
      userData.transaction.source !== "" &&
      userData.transaction.destination !== ""
    ) {
      if (userData.transaction.amount === "") {
        NotificationManager.error("Please fill in amount.", "Alert", 5000);
        return;
      } else if (userData.transaction.destination === "") {
        NotificationManager.error("Please select source name.", "Alert", 5000);
        return;
      } else if (userData.transaction.destination === "") {
        NotificationManager.error(
          "Please select destination name.",
          "Alert",
          5000
        );
        return;
      } else if (
        userData.transaction.destination === userData.transaction.source
      ) {
        NotificationManager.error(
          "Source and destination cannot be same.",
          "Alert",
          5000
        );
        return;
      } else if (
        Number(userData.transaction.source.split(",")[2]) <
        Number(userData.transaction.amount)
      ) {
        NotificationManager.error(
          "Source balance should be greater than amount.",
          "Alert",
          5000
        );
        return;
      }
    } else {
      NotificationManager.error(
        "Please fill in details.",
        "Alert",
        5000
      );
      return;
    }
    let source = userData.transaction.source.split(",");
    let sourceid = source[1];
    let sourceowner = source[0];
    let sourcebalance = source[2];
    let sourcecurrency = source[3];
    let destination = userData.transaction.destination.split(",");
    let destinationid = destination[1];
    let destinationowner = destination[0];
    let destinationbalance = destination[2];
    let destinationcurrency = destination[3];
    let requestString =
      '{"source":{"id":"' +
      sourceid +
      '","owner":"' +
      sourceowner +
      '","balance":"' +
      sourcebalance +
      '","currency":"' +
      sourcecurrency +
      '"},';
    requestString +=
      '"destination":{"id":"' +
      destinationid +
      '","owner":"' +
      destinationowner +
      '","balance":"' +
      destinationbalance +
      '","currency":"' +
      destinationcurrency +
      '"},';
    requestString += '"amount":"' + userData.transaction.amount + '"}';
    let link = Api.Api + "transactions";
    fetch(link, {
      method: "POST",
      body: requestString,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        if (data != null) {
          NotificationManager.success(
            "Transaction has been successfully created.",
            "Success",
            5000
          );
          this.setState({
            transaction: {
              source: "",
              destination: "",
              amount: "",
            },
            selectedSourceCur:{curr:""}
          });
        }
      });
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      transaction: {
        source: "",
        destination: "",
        amount: "",
      },
      selectedSourceCur:{curr:""}
    });
  }

  render() {
    return (
      <form className="container-fluid center" onSubmit={this.handleFormSubmit}>
        <Input
          title={"Amount"}
          name={"amount"}
          value={this.state.transaction.amount}
          placeholder={"Enter amount"}
          handleChange={this.handleInput}
        />
        <legend className="col-lg-offset-4" Style="width:33%">
          Source Details:
        </legend>
        <Select 
          title={"Owner"}
          id={"source"}
          name={"source"}
          options={this.state.accounts}
          value={this.state.transaction.source}
          placeholder={"Select account"}
          handleChange={this.handleInput}
        />
        <Input
          disabled
          title={"Currency"}
          name={"currency"}
          value={this.state.selectedSourceCur.curr}
        />
        <legend className="col-lg-offset-4" Style="width:33%">
          Destination Details:
        </legend>
        <Select 
          title={"Owner"}
          id={"destination"}
          name={"destination"}
          options={this.state.accounts}
          value={this.state.transaction.destination}
          placeholder={"Select account"}
          handleChange={this.handleDestInput}
        />
        <Button
          id={"transsubmit"}
          action={this.handleFormSubmit}
          type={"btn btn-primary col-lg-offset-4"}
          title={"Submit"}
        />
        <Button
          id={"transclear"}
          action={this.handleClearForm}
          type={"btn btn-secondary margin-5"}
          title={"Clear"}
        />
      </form>
    );
  }
}

export default TransactionContainer;
