import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default class App extends Component {
  state = {
    display: "0",
    output: "",
  };

  //handling clicking numbers
  handleNumbers = (number) => {
    this.setState((prevState) => {
      if (prevState.output.includes("=")) {
        return {
          // if the output contains '=' sign >> start new operation
          display: number.toString(),
          output: number.toString(),
        };
      } else if (prevState.display.includes(".") && number === ".") {
        return {
          // if the number already has one decimal point >> do not add another one
          display: prevState.display,
          output: prevState.output,
        };
      } else {
        return {
          // default case
          display:
            prevState.display.toString().replace(/^0+/, "") + number.toString(),
          output: prevState.output.replace(/^0+/, "") + number.toString(),
        };
      }
    });
  };

  //handling clicking operators
  handleOperator = (operator) => {
    this.setState((prevState) => {
      if (
        prevState.display.slice(-1) === operator &&
        !prevState.output.includes("=")
      ) {
        //if the operator is repeated && output has not got "=">> do not add operator
        return {
          display: prevState.display,
          output: prevState.output,
        };
      } else if (prevState.output.includes("=")) {
        //if the output contains '=' sign >> show operator on display + show result only on output
        return {
          display: operator,
          output:
            prevState.output.slice(prevState.output.indexOf("=") + 1) +
            operator,
        };
      } else if (
        prevState.output.endsWith("/") ||
        prevState.output.endsWith("*") ||
        prevState.output.endsWith("-") ||
        prevState.output.endsWith("+")
      ) {
        //if the output contains '+ or / or * or-' at end >> replace it with the new operator
        if (
          operator !== "-" &&
          !isNaN(prevState.output.charAt(prevState.output.length - 2))
        ) {
          return {
            display: prevState.display.replace(
              prevState.display.charAt(prevState.display.length - 1),
              operator
            ),
            output: prevState.output.replace(
              prevState.output.charAt(prevState.output.length - 1),
              operator
            ),
          };
        }
        if (operator === "-") {
          return {
            display: operator,
            output: prevState.output + operator,
          };
        }
      } else {
        //default case
        return {
          display: operator,
          output: prevState.output + operator,
        };
      }
    });
  };

  //handling math operations
  doingMath = () => {
    // do the math here
    const equation = this.state.output;
    //check if equation has = sign
    if (equation.includes("=")) {
      return; // if it has >> do nothing
    }
    let result = eval(equation);
    //check if result has decimal places
    // so we reduce it to only 8 decimal places if it has
    if (result % 1 !== 0) {
      result = result.toFixed(8);
    }
    // change output and display values
    this.setState((prevState) => ({
      display: result.toString(),
      output: prevState.output + "=" + result,
    }));
  };
  //clear
  handleClear = () => {
    this.setState({
      display: "0",
      output: "",
    });
  };
  render() {
    const { display, output } = this.state;
    return (
      <Container
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center bg-secondary bg-gradient"
        fluid
      >
        <Container
          style={{ maxWidth: 350 }}
          className="rounded bg-dark text-light"
        >
          <Row className="flex-column text-end pt-2 pb-1">
            <Col
              style={{ minHeight: 24 }}
              className="text-warning px-1"
              id="output"
            >
              <p className="m-0" style={{ wordWrap: "break-word" }}>
                {output}
              </p>
            </Col>
            <Col
              style={{ wordWrap: "break-word" }}
              className="px-1 h3 m-0"
              id="display"
            >
              {display}
            </Col>
          </Row>

          <Row className="d-grid p-1">
            <Col
              className="bg-danger cal-btn "
              id="clear"
              onClick={() => this.handleClear()}
            >
              AC
            </Col>
            <Col
              className="bg-warning text-dark bg-gradient cal-btn"
              id="divide"
              onClick={() => this.handleOperator("/")}
            >
              /
            </Col>
            <Col
              className="bg-warning text-dark bg-gradient cal-btn"
              id="multiply"
              onClick={() => this.handleOperator("*")}
            >
              X
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="seven"
              onClick={() => this.handleNumbers(7)}
            >
              7
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="eight"
              onClick={() => this.handleNumbers(8)}
            >
              8
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="nine"
              onClick={() => this.handleNumbers(9)}
            >
              9
            </Col>
            <Col
              className="bg-warning text-dark bg-gradient cal-btn"
              id="substract"
              onClick={() => this.handleOperator("-")}
            >
              -
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="four"
              onClick={() => this.handleNumbers(4)}
            >
              4
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="five"
              onClick={() => this.handleNumbers(5)}
            >
              5
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="six"
              onClick={() => this.handleNumbers(6)}
            >
              6
            </Col>
            <Col
              className="bg-warning text-dark bg-gradient cal-btn"
              id="add"
              onClick={() => this.handleOperator("+")}
            >
              +
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="one"
              onClick={() => this.handleNumbers(1)}
            >
              1
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="two"
              onClick={() => this.handleNumbers(2)}
            >
              2
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="three"
              onClick={() => this.handleNumbers(3)}
            >
              3
            </Col>
            <Col
              className="bg-primary cal-btn"
              id="equals"
              onClick={() => this.doingMath()}
            >
              =
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="zero"
              onClick={() => this.handleNumbers(0)}
            >
              0
            </Col>
            <Col
              className="bg-light bg-gradient text-dark cal-btn"
              id="decimal"
              onClick={() => this.handleNumbers(".")}
            >
              .
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
