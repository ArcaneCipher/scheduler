import { renderHook } from "@testing-library/react";

import useVisualMode from "../useVisualMode";

const FIRST = "FIRST";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});