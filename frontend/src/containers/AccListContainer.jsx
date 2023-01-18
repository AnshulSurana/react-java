import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import Api from "../Api.json";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { NotificationManager } from "react-notifications";
import Button from "../components/Button";
import Select from "../components/SizeSelect";

class AccListContainer extends Component {
  constructor(props) {
    super(props);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleSize = this.handleSize.bind(this);
  }

  state = {
    accounts: [],
    pageOptions: ["10", "20", "40"],
    records: { value: "0" },
    size: { value: "10" },
    pagePrevProp: { value: "btn btn-secondary disabled margin-5 pull-right" },
    pageNextProp: { value: "btn btn-secondary margin-5 pull-right" },
    columns: [
      {
        dataField: "id",
        text: "Id",
      },

      {
        dataField: "owner",
        text: "Name",
        sort: true,
        filter: textFilter(),
      },
      {
        dataField: "balance",
        text: "Balance",
        sort: true,
      },
      {
        dataField: "currency",
        text: "Currency",
        sort: true,
      },

      {
        dataField: "createdOn",
        text: "Created On",
        sort: true,
      },
    ],
  };

  componentDidMount() {
    axios.get(Api.Api + "accounts?page=0&size=10").then((response) => {
      this.setState({
        accounts: response.data,
      });
      if (this.state.accounts.length === 0) {
        NotificationManager.info("No record found.", "Info", 3000);
        return;
      }
    });
  }

  handleSize(e) {
    let value = e.target.value;
    this.setState({ size: { value } });
    axios
      .get(
        Api.Api + "accounts?page=" + this.state.records.value + "&size=" + value
      )
      .then((response) => {
        this.setState({
          accounts: response.data,
        });
        if (this.state.accounts.length === 0) {
          NotificationManager.info("No record found.", "Info", 3000);
          return;
        }
      });
  }

  handlePrevClick() {
    if (
      this.state.pagePrevProp.value !==
      "btn btn-secondary disabled margin-5 pull-right"
    ) {
      let value = this.state.records;
      value = Number(value.value) - 1;
      this.setState({ records: { value } });
      axios
        .get(
          Api.Api + "accounts?page=" + value + "&size=" + this.state.size.value
        )
        .then((response) => {
          this.setState({
            accounts: response.data,
          });
          if (value === 0) {
            let value = "btn btn-secondary disabled margin-5 pull-right";
            this.setState({ pagePrevProp: { value } });
          }
          if (this.state.accounts.length / this.state.size.value === 1) {
            let value = "btn btn-secondary margin-5 pull-right";
            this.setState({ pageNextProp: { value } });
          }
        });
    }
  }

  handleNextClick() {
    if (
      this.state.pageNextProp.value !==
      "btn btn-secondary disabled margin-5 pull-right"
    ) {
      let value = this.state.records;
      value = Number(value.value) + 1;
      this.setState({ records: { value } });
      axios
        .get(
          Api.Api + "accounts?page=" + value + "&size=" + this.state.size.value
        )
        .then((response) => {
          this.setState({
            accounts: response.data,
          });
          if (this.state.accounts.length / this.state.size.value < 1) {
            let value = "btn btn-secondary disabled margin-5 pull-right";
            this.setState({ pageNextProp: { value } });
          }
          if (value !== 0) {
            value = "btn btn-secondary margin-5 pull-right";
            this.setState({ pagePrevProp: { value } });
          }
          if (this.state.accounts.length === 0) {
            NotificationManager.info("No record found.", "Info", 3000);
            return;
          }
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div class="row" className="hdr">
          <div class="col-sm-12 btn btn-success">Account Details</div>
        </div>
        <div style={{ marginTop: 20 }}>
          <BootstrapTable
            striped
            hover
            keyField="id"
            data={this.state.accounts}
            columns={this.state.columns}
            filter={filterFactory()}
          ></BootstrapTable>
          <Select
            name={"Size"}
            options={this.state.pageOptions}
            value={this.state.size.value}
            placeholder={"Size"}
            handleChange={this.handleSize}
          />
          <Button
            id={"pagNext"}
            action={this.handleNextClick}
            type={this.state.pageNextProp.value}
            title={"Next"}
          />
          <Button
            id={"pagPrev"}
            action={this.handlePrevClick}
            type={this.state.pagePrevProp.value}
            title={"Prev"}
          />
        </div>
      </div>
    );
  }
}

export default AccListContainer;
