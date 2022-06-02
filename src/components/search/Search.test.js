import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import store from "../../store"
import SearchField from "./index";


const toRender = component => render(
  <Provider store={store}>
    {component}
  </Provider>
)

describe("search input", () => {
  test("search input is rendered", async () => {
    toRender(<SearchField />)
    const input = await screen.findByPlaceholderText("Search...")
    expect(input).toBeInTheDocument()
  });

  test("search input is empty at first render", async () => {
    toRender(<SearchField />)
    const input = await screen.findByPlaceholderText("Search...")
    expect(input.value).toBe('') // empty before

    userEvent.type(input, 'Sousse')
    expect(input.value).toBe('Sousse')
  });
});
