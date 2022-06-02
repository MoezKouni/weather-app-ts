import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store";
import SearchField from "../search";
import CarouselItem from "./CarouselItem";

const toRender = (component) =>
  render(<Provider store={store}>{component}</Provider>);

test("fetch geolocation based on city name entered", async () => {
  toRender(<SearchField />);
  const input = await screen.findByPlaceholderText("Search...");

  userEvent.type(input, "Sousse");
  expect(input.value).toBe("Sousse");

  const { findByText } = toRender(
    <CarouselItem
      item={{
        date: "2022-06-02 15:00:00",
        timestamps: [
          {
            dt: 1654560000,
            dt_txt: "2022-06-02 15:00:00",
            main: {
                temp:298.11
            },
            weather: [
              {
                id: 802,
                main: "Clouds",
                description: "scattered clouds",
                icon: "03n",
              },
            ],
          },
        ],
      }}
      unit="fahrenheit"
    />
  );
  expect(await findByText("15:00")).toBeInTheDocument();
});
