const { capitalizeWords, filterActiveUsers, logAction } = require('../index')
const {
  capitalizeWords,
  filterActiveUsers,
  logAction
} = require("../index");

describe("capitalizeWords", () => {
  test("capitalizes each word", () => {
    expect(capitalizeWords("hello world"))
      .toBe("Hello World");
  });

  test("handles an empty string", () => {
    expect(capitalizeWords("")).toBe("");
  });

  test("handles a single word", () => {
    expect(capitalizeWords("javascript"))
      .toBe("Javascript");
  });

  test("handles special characters", () => {
    expect(capitalizeWords("hello-world"))
      .toBe("Hello-World");
  });

  test("handles already capitalized words", () => {
    expect(capitalizeWords("HELLO WORLD"))
      .toBe("HELLO WORLD");
  });
});

describe("filterActiveUsers", () => {
  test("filters active users from mixed users", () => {
    const users = [
      { name: "Alice", isActive: true },
      { name: "Bob", isActive: false },
      { name: "Charlie", isActive: true }
    ];

    expect(filterActiveUsers(users)).toEqual([
      { name: "Alice", isActive: true },
      { name: "Charlie", isActive: true }
    ]);
  });

  test("returns empty array for inactive users", () => {
    const users = [
      { name: "Bob", isActive: false },
      { name: "David", isActive: false }
    ];

    expect(filterActiveUsers(users)).toEqual([]);
  });

  test("handles an empty array", () => {
    expect(filterActiveUsers([])).toEqual([]);
  });

  test("returns all users when all are active", () => {
    const users = [
      { name: "Alice", isActive: true },
      { name: "Charlie", isActive: true }
    ];

    expect(filterActiveUsers(users)).toEqual(users);
  });
});

describe("logAction", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(
      new Date("2026-01-01T12:00:00.000Z")
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("generates correct log message", () => {
    expect(logAction("login", "Alice")).toBe(
      "User Alice performed login at 2026-01-01T12:00:00.000Z"
    );
  });

  test("handles missing action", () => {
    expect(logAction(undefined, "Alice")).toBe(
      "User Alice performed undefined at 2026-01-01T12:00:00.000Z"
    );
  });

  test("handles missing username", () => {
    expect(logAction("login", undefined)).toBe(
      "User undefined performed login at 2026-01-01T12:00:00.000Z"
    );
  });

  test("handles empty strings", () => {
    expect(logAction("", "")).toBe(
      "User  performed  at 2026-01-01T12:00:00.000Z"
    );
  });
});
