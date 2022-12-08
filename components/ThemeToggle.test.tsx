import { expect, test } from "@jest/globals";
import ThemeToggle, { setDOMTheme } from "./ThemeToggle";
import renderer from "react-test-renderer";

test("renders the ThemeToggle correctly", () => {
  const tree = renderer.create(<ThemeToggle />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("setDOMTheme(true) correctly sets localstorage and document body classes", () => {
  Object.create(localStorage)
  Object.defineProperty(document, 'documentElement', {
    configurable: true,
    value: document.createElement('document')
  });
 
  setDOMTheme(true)
  
  expect(localStorage.theme).toBe("light")
  expect(document.documentElement.classList).not.toContain("dark")
})

test("setDOMTheme(false) correctly sets localstorage and document body classes", () => {
  Object.create(localStorage)
  Object.defineProperty(document, 'documentElement', {
    configurable: true,
    value: document.createElement('document')
  });
 
  setDOMTheme(false)
  
  expect(localStorage.theme).toBe("dark")
  expect(document.documentElement.classList).toContain("dark")
})