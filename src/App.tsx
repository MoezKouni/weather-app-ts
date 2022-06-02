import { ChangeEvent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, HStack, Stack, Text } from "@chakra-ui/react";
import SearchField from "./components/search";
import MultiCarousel from "./components/multi-carousel/MultiCarousel";
import { getGeoLatLon } from "./actions/geo.actions";
import bgImage from "./assets/img/bg.webp";
import ErrorBanner from "./components/banner/ErrorBanner";
import { RootState } from "./reducer";
import { Dispatch } from "redux";

function App() {
  const { error } = useSelector((state: RootState) => state.weather)
  const dispatch = useDispatch<Dispatch<any>>();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(getGeoLatLon(e.target.value));
  }, []);

  useEffect(() => {
    dispatch(getGeoLatLon("tunis"));
  }, []);

  return (
    <Box>
      <Box
        bgRepeat={"no-repeat"}
        bgSize="cover"
        bgImage={`url(${bgImage})`}
        minH={"100vh"}
        filter="blur(0px)"
        border="none"
        p="0"
      />
      <Container
        maxW={"7xl"}
        position="absolute"
        height={"100%"}
        left={"50%"}
        zIndex={2}
        top={"50%"}
        transform={"translate(-50%, -50%)"}
      >
        <Stack height={"100%"}>
          <HStack py="4" justify={"space-between"} align="center">
            <Text color="white" fontWeight={"light"} fontSize="xl">
              Insta<strong>Weather</strong>
            </Text>
            <SearchField handleChange={handleChange} />
          </HStack>
          {error ? <ErrorBanner /> : <MultiCarousel />}
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
