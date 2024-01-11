import { useEffect, useState, useReducer } from "react";
import { FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { initialState, wordsReducer } from "./WordsReducer";

const App = () => {
  const [words, dispatchWords] = useReducer(wordsReducer, initialState);
  const [wordsGoal, setWordsGoal] = useState(100);
  const [editGoal, setEditGoal] = useState(false);

  const handleEditGoal = () => {
    if (editGoal) {
      dispatchWords({
        type: "EDIT_GOAL",
        payload: wordsGoal,
      });
    }
    setEditGoal(!editGoal);
  };

  const handleInputGoal = (event) => {
    setWordsGoal(event.target.value);
  };

  const handleChangeText = (event) => {
    const text = event.target.value;
    dispatchWords({
      type: "EDIT_TEXT",
      payload: text,
    });
  };

  useEffect(() => {
    dispatchWords({
      type: "INIT",
    });
  }, []);

  const saveText = () => {
    dispatchWords({
      type: "SAVE_STATE",
    });
  };

  const clearSavedText = () => {
    dispatchWords({
      type: "REMOVE_STATE",
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Word Counter</h1>
          <p>Words goal : {words.wordsGoal}</p>
          <p>Currant Words Number : {words.currentWordsNumber}</p>
          <p>percentage Goal : {words.percentageGoal} %</p>
          {words.goalReached && <p>Goal Reached</p>}
          {editGoal && (
            <Row className="">
              <Col md={12}>
                <Form>
                  <Form.Group>
                    <Form.Label>Set a new words goals</Form.Label>
                    <Form.Control
                      className="border border-dark my-3"
                      value={wordsGoal}
                      onChange={handleInputGoal}
                      type="number"></Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          )}
          <Button variant="primary" onClick={handleEditGoal}>
            Edit Goal
          </Button>
          <Button onClick={saveText}>Save Text</Button>
          <Button onClick={clearSavedText}>Clear saved text</Button>
          <FormControl
            as="textarea"
            className="border border-dark my-3"
            style={{ height: "100vh", width: "80vw" }}
            placeholder="Start writing your story"
            onChange={handleChangeText}
            value={words.writtenText}></FormControl>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
