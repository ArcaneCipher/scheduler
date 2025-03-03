import { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(
    props.interviewer !== undefined ? props.interviewer : null
  );
  const [error, setError] = useState("");

  /**
   * Validates input and triggers onSave.
   */
  function validateAndSave() {
    if (!name) {
      setError("Student name cannot be blank.");
      return;
    }

    if (!interviewer) {
      setError("Please select an interviewer.");
      return;
    }

    setError(""); // Clear any previous errors before saving
    props.onSave(name, interviewer);
  }

  /**
   * Resets the form fields.
   */
  function reset() {
    setName("");
    setInterviewer(null);
    setError(""); // Clear errors when resetting
  }

  /**
   * Handles canceling the form.
   */
  function cancel() {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          {error && <section className="appointment__validation">{error}</section>}
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validateAndSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
