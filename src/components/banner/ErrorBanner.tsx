import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function ErrorBanner() {
  return (
    <Stack
      textAlign="center"
      py={10}
      px={6}
      bg="blackAlpha.500"
      rounded={"xl"}
      backdropFilter="blur(8px)"
      h="40%"
      align={"center"}
      justify="center"
    >
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <CloseIcon boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      <Heading color="white" as="h2" size="xl" mt={6} mb={2}>
        Country Not Found
      </Heading>
      <Text color={"gray.500"}>Please try again!</Text>
    </Stack>
  );
}
