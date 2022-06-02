import {
  Badge,
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useCallback } from "react";
import { useSelector } from "react-redux";

type Props = {
  item: {
    date: string;
    timestamps: any[];
  };
  unit: string;
};

export default function CarouselItem({
  item: { date, timestamps },
  unit,
}: Props) {
  const { isLoading } = useSelector((state: any) => state.weather);

  const isItToday = useCallback(() => {
    const today = new Date().getDay();
    const dateDay = new Date(date).getDay();

    if (today === dateDay) {
      return "2px solid orange";
    } else {
      return "none";
    }
  }, []);

  const convertTemp = useCallback(
    (temp: number) => {
      if (unit === "celsius") {
        return (temp - 273.15).toFixed(2) + "°C";
      } else {
        return (((temp - 273.15) * 9) / 5 + 32).toFixed(2) + "°F";
      }
    },
    [unit]
  );

  return (
    <Stack
      bg="blackAlpha.500"
      backdropFilter={"blur(8px)"}
      rounded="xl"
      p="8"
      border={isItToday()}
      color="white"
      position={"relative"}
      overflow="hidden"
      spacing={8}
    >
      {!isLoading && (
        <Stack spacing={2}>
          <Heading fontSize={"1.5rem"} fontWeight="light">
            {moment(new Date(date)).format("dddd")}
            {isItToday() !== "none" && <Badge ml="2">Today</Badge>}
          </Heading>
          <Heading fontSize={"2rem"}>
            {moment(new Date(date)).format("DD/MM/YYYY")}
          </Heading>
        </Stack>
      )}
      <Box
        position={"absolute"}
        top="-60px"
        left="-50px"
        bg={"black"}
        rounded="full"
        h="72"
        w="72"
        opacity={0.3}
        filter="blur(50px)"
        zIndex={-1}
      />
      <Grid
        gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gridTemplateRows={{ base: "repeat(4, 1fr)", md: "1fr 1fr" }}
        gap={4}
      >
        {timestamps.map((timestamp: any) => (
          <GridItem key={timestamp.dt} borderBottom="1px solid orange">
            <Stack spacing={0} align="center">
              <Text>
                {new Date(timestamp.dt_txt)
                  .toLocaleTimeString()
                  .substring(0, 5)}
              </Text>
              <img
                src={`https://openweathermap.org/img/wn/${timestamp.weather[0].icon}.png`}
                width="50px"
              />
              {/* <Text>{unit !== "fahrenheit" ? `${convertTempToCelcius(timestamp.main.temp).toFixed(2)}°C` : `${timestamp.main.temp}°F`}</Text> */}
              <Text>{convertTemp(timestamp.main.temp)}</Text>
            </Stack>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
}
