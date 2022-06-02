import { rest } from "msw";

export const handlers = [
  rest.get(`https://api.openweathermap.org/geo/1.0/direct`, (req, res, ctx) => {
    const city = req.url.searchParams.get("q");

    return res(
      ctx.status(200),
      ctx.json({
        name: city,
        lat: 36.8002068,
        lon: 10.1857757,
      })
    );
  }),
  rest.get(
    `https://api.openweathermap.org/data/2.5/forecast`,
    (req, res, ctx) => {
      const lat = req.url.searchParams.get('lat');
      const lon = req.url.searchParams.get('lon');

      return res(
        ctx.status(200),
        ctx.json({
          id: 2472818,
          name: "Tunis",
          coord: {
            lat: lat,
            lon: lon,
          },
          list: [
            {
              dt: 1654192800,
              main: {
                temp: 307.91,
                feels_like: 306.92,
                temp_min: 305.45,
                temp_max: 307.91,
                pressure: 1013,
                sea_level: 1013,
                grnd_level: 1014,
                humidity: 27,
                temp_kf: 2.46,
              },
              weather: [
                {
                  id: 802,
                  main: "Clouds",
                  description: "scattered clouds",
                  icon: "03d",
                },
              ],
              clouds: {
                all: 43,
              },
              wind: {
                speed: 5.43,
                deg: 195,
                gust: 9.62,
              },
              visibility: 10000,
              pop: 0.04,
              sys: {
                pod: "d",
              },
              dt_txt: "2022-06-02 18:00:00",
            },
          ],
          country: "TN",
          population: 0,
          timezone: 3600,
          sunrise: 1654142499,
          sunset: 1654194788,
        })
      );
    }
  ),
];
