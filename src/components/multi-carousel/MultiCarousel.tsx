import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigation } from "swiper";
import {
  Box,
  Heading,
  IconButton,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import CarouselItem from "./CarouselItem";
import CarouselLoading from "./CarouselLoading";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { RootState } from "../../reducer";

export default function MultiCarousel() {
  const [unit, setUnit] = useState("fahrenheit");
  const state = useSelector((state: RootState) => state.weather);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box zIndex={2}>
      {state.isLoading ? (
        <Skeleton
          rounded={"0.8rem"}
          w="full"
          h="16"
          maxW={"md"}
          my="8"
          startColor="blackAlpha.100"
          endColor="blackAlpha.500"
        />
      ) : (
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          justify={"space-between"}
        >
          <Heading my="8" color="white">
            {state.data?.name + ", " + state.data?.code}
          </Heading>
          <RadioGroup
            defaultValue={unit}
            onChange={(nextValue: string) => setUnit(nextValue)}
          >
            <Stack spacing={4} direction="row">
              <Radio size={"lg"} value="fahrenheit" colorScheme="white">
                <Text color="white">Fahrenheit</Text>
              </Radio>
              <Radio
                color="white"
                size={"lg"}
                value="celsius"
                colorScheme="white"
              >
                <Text color="white">Celsius</Text>
              </Radio>
            </Stack>
          </RadioGroup>
        </Stack>
      )}
      {state.isLoading ? (
        <CarouselLoading />
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          loop={true}
          autoplay={false}
          pagination={{
            clickable: false,
            type: "custom",
          }}
          modules={[Navigation]}
          onBeforeInit={(swiper: any) => {
            swiper.params.navigation.prevEl = prevRef.current
              ? prevRef.current
              : undefined;
            swiper.params.navigation.nextEl = nextRef.current
              ? nextRef.current
              : undefined;
          }}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          grabCursor={true}
          className="mySwiper"
          style={{ position: "relative" }}
        >
          <IconButton
            zIndex={2}
            aria-label="prev-btn"
            icon={<ChevronLeftIcon color="white" />}
            ref={prevRef}
            fontSize={"lg"}
            bg="blackAlpha.600"
            h="28"
            _hover={{ bg: "blackAlpha.600" }}
            _active={{ bg: "blackAlpha.600" }}
            _focus={{ outline: "none" }}
            size={"sm"}
            position="absolute"
            left={"0px"}
            top="50%"
            transform={"translateY(-50%)"}
          />

          <div>
            {state?.data?.list.map((el: any) => (
              <SwiperSlide key={el.date}>
                <CarouselItem item={el} unit={unit} />
              </SwiperSlide>
            ))}
          </div>

          <IconButton
            zIndex={2}
            aria-label="next-btn"
            icon={<ChevronRightIcon color="white" />}
            ref={nextRef}
            fontSize={"lg"}
            bg="blackAlpha.600"
            h="28"
            _hover={{ bg: "blackAlpha.600" }}
            _active={{ bg: "blackAlpha.600" }}
            _focus={{ outline: "none" }}
            size={"sm"}
            position="absolute"
            right={"0px"}
            top="50%"
            transform={"translateY(-50%)"}
          />
        </Swiper>
      )}
    </Box>
  );
}
