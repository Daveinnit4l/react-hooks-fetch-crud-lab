import React, { Component } from "react";
import QuestionItem from "./QuestionItem";

class QuestionList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => this.setState({ questions: data }));
  }

  handleUpdateQuestion = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const { questions } = this.state;
          const updatedQuestions = questions.map((question) => {
            if (question.id === id) {
              return { ...question, correctIndex };
            }
            return question;
          });
          this.setState({ questions: updatedQuestions });
        }
      });
  }

  render() {
    const { questions } = this.state;

    return (
      <section>
        <h1>Quiz Questions</h1>
        <ul>
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onUpdate={this.handleUpdateQuestion}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default QuestionList;

