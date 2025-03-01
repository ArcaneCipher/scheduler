import { useState } from "react";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  // Define mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // State to store the error message
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Saves an appointment by calling bookInterview and transitioning states.
   * Validates that both name and interviewer are provided before proceeding.
   * @param {string} name - Student's name
   * @param {number} interviewer - Interviewer ID
   * @param {string} [error] - Optional error message for validation failure
   */
  function save(name, interviewer, error = "") {
    if (error) {
      setErrorMessage(error); // Store the specific error message
      transition(ERROR_SAVE, true);
      return;
    }

    const interview = { student: name, interviewer };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => {
        setErrorMessage("An error occurred while saving the appointment.");
        transition(ERROR_SAVE, true);
      });
  }

  function destroy() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => {
        setErrorMessage("An error occurred while deleting the appointment.");
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewers.find(
            (interviewer) => interviewer.id === props.interview.interviewer
          )}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={destroy}
        />
      )}

      {mode === ERROR_SAVE && <Error message={errorMessage} onClose={back} />}

      {mode === ERROR_DELETE && <Error message={errorMessage} onClose={back} />}
    </article>
  );
}
