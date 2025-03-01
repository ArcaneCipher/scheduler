import { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(
    props.interviewer !== undefined ? props.interviewer : null
  );

  function validateAndSave() {
    if (!name) {
      props.onSave(name, interviewer, "Student name cannot be blank.");
      return;
    }

    if (!interviewer) {
      props.onSave(name, interviewer, "Please select an interviewer.");
      return;
    }

    props.onSave(name, interviewer);
  }

  function reset() {
    setName("");
    setInterviewer(null);
  }

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
          />
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
