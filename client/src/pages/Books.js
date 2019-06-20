import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
// import { eventNames } from "cluster";
const API = require("../utils/API").default

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: []
  };
  //using .bing(this) in ES6 needed when not using an arrow function
  onChange(event) {
    console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  //using .bing(this) in ES6 not needed when using an arrow function
  submitBook = (event) => {
    event.preventDefault();
    console.log("Hello submitBook");

    API.saveBook({
      title: this.state.title,
      author: this.state.author,
      synopsis: this.state.synopsis
    });
    this.loadBooks();
  };





  // Add code here to get all books from the database and save them to this.state.books

  //this code is the react version of <body onLoad="componentDidMount()">
  componentDidMount() {
    this.loadBooks();
  }


  loadBooks = () => {
    API.getBooks()
      .then(res => {
        console.log(res.data);
        this.setState({ books: res.data }
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input onChange={this.onChange.bind(this)} name="title" placeholder="Title (required)" />
              <Input onChange={this.onChange.bind(this)} name="author" placeholder="Author (required)" />
              <TextArea onChange={this.onChange.bind(this)} name="synopsis" placeholder="Synopsis (Optional)" />
              <FormBtn onClick={this.submitBook}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn book={this.state.books._id} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
