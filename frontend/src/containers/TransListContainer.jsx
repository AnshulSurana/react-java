import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import Api from "../Api.json";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Input from "../components/Input";
import Button from "../components/Button";
import { NotificationManager } from "react-notifications";
class TransListContainer extends Component {
  constructor(props) {
    super(props);
    this.fetchResults = this.fetchResults.bind(this);
    this.handleInputto = this.handleInputto.bind(this);
    this.handleInputfrom = this.handleInputfrom.bind(this);
  }

  state = {
    transactions: [],
    dateto: { value: "" },
    datefrom: { value: "" },
    columns: [
      {
        dataField: "id",
        text: "Id",
      },
      {
        dataField: "source.owner",
        text: "Source Name",
        sort: true,
        filter: textFilter(),
      },
      {
        dataField: "source.balance",
        text: "Balance",
        sort: true,
      },
      {
        dataField: "source.currency",
        text: "Currency",
        sort: true,
      },
      {
        dataField: "destination.owner",
        text: "Destination Name",
        sort: true,
        filter: textFilter(),
      },
      {
        dataField: "destination.balance",
        text: "Balance",
        sort: true,
      },
      {
        dataField: "destination.currency",
        text: "Currency",
        sort: true,
      },
      {
        dataField: "amount",
        text: "Amount",
        sort: true,
      },
      {
        dataField: "createdOn",
        text: "Transaction Date",
        sort: true,
      },
    ],
  };

  handleInputto(e) {
    let value = e.target.value;
    this.setState({ dateto: { value } });
  }
  handleInputfrom(e) {
    let value = e.target.value;
    this.setState({ datefrom: { value } });
  }
  componentDidMount() {
    var dateto=new Date();
    var datefrom=new Date();
    dateto.setDate(dateto.getDate() + 1);
    datefrom=datefrom.toLocaleDateString();
    dateto=dateto.toLocaleDateString();
    datefrom=datefrom.split("/");
    dateto=dateto.split("/");
    var date_from=datefrom[2]+"-"+datefrom[0]+"-"+datefrom[1];
    var date_to=dateto[2]+"-"+dateto[0]+"-"+dateto[1];
    axios
      .get(
        Api.Api +
          "transactions?from=" +
          date_from+
          "&to=" +
          date_to
      )
      .then((response) => {
        this.setState({
          transactions: response.data,
        });
        if (this.state.transactions.length === 0) {
          NotificationManager.info("No record found.", "Info", 3000);
          return;
        }
      });
    NotificationManager.info(
      "Please select date to and from for fetching records.",
      "Info",
      3000
    );
  }

  fetchResults() {
    if (this.state.datefrom.value === "" || this.state.dateto.value === "") {
      NotificationManager.error(
        "Please select both date from and date to.",
        "Alert",
        3000
      );
      return;
    } else if (this.state.datefrom.value > this.state.dateto.value) {
      NotificationManager.error(
        "Date from cannot be greater than date to.",
        "Alert",
        3000
      );
      return;
    }

    axios
      .get(
        Api.Api +
          "transactions?from=" +
          this.state.datefrom.value +
          "&to=" +
          this.state.dateto.value
      )
      .then((response) => {
        this.setState({
          transactions: response.data,
        });
        if (this.state.transactions.length === 0) {
          NotificationManager.info("No record found.", "Info", 3000);
          return;
        }
      });
  }

  render() {
    return (
      <div className="container">
        <Input
          inputType={"date"}
          title={"Date From"}
          name={"datefrom"}
          value={this.state.datefrom.value}
          placeholder={"Select Date from:"}
          handleChange={this.handleInputfrom}
        />
        <Input
          inputType={"date"}
          title={"Date To"}
          name={"dateto"}
          value={this.state.dateto.value}
          placeholder={"Select Date to:"}
          handleChange={this.handleInputto}
        />
        <div class="text-center">
          <Button
            id={"transsearch"}
            action={this.fetchResults}
            type={"btn btn-primary margin-5"}
            title={"Search"}
          />
        </div>
        <legend />
        <div class="row" className="hdr">
          <div class="col-sm-12 btn btn-info">Transaction Details</div>
        </div>
        <div style={{ marginTop: 20 }}>
          <BootstrapTable
            striped
            hover
            keyField="id"
            data={this.state.transactions}
            columns={this.state.columns}
            filter={filterFactory()}
            pagination={paginationFactory()}
          ></BootstrapTable>
        </div>
      </div>
    );
  }
}

export default TransListContainer;
