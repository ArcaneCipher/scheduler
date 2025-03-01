import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "../helpers/selectors";

import useApplicationData from "../hooks/useApplicationData";

import "./Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import Button from "./Button"; 

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={appointment.interview}
          interviewers={interviewers}
          bookInterview={bookInterview} // Ensure this is present
          cancelInterview={cancelInterview} // Ensure this is present
        />
      );
    }
  );

  // Function to reset the database
  const handleReset = () => {
    fetch("/api/debug/reset", { method: "GET" })
      .then((res) => {
        if (res.ok) {
          window.location.reload(); // Reload the app to reflect changes
        } else {
          alert("Database reset failed.");
        }
      })
      .catch((error) => alert("Error resetting database:", error));
  };

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <Button danger onClick={handleReset} className="reset-button">
          Reset DB
        </Button>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
