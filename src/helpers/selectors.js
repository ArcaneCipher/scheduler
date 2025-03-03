export function getAppointmentsForDay(state, day) {
  if (!state.days || !Array.isArray(state.days)) return []; // Guard clause

  const found = state.days.find((d) => d.name === day);

  if (!found || !Array.isArray(found.appointments)) return [];

  return found.appointments.map((id) => state.appointments[id]);
}

export function getInterviewersForDay(state, day) {
  if (!state.days || !Array.isArray(state.days)) return []; // Guard clause

  const found = state.days.find((d) => d.name === day);

  if (!found || !Array.isArray(found.interviewers)) return [];

  return found.interviewers.map((id) => state.interviewers[id]);
}

export function getInterview(state, interview) {
  return (
    interview && {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    }
  );
}
