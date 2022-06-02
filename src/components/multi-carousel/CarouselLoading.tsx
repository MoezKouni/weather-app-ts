import { Grid, GridItem, Skeleton } from "@chakra-ui/react";

export default function CarouselLoading() {
  return (
    <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">
      {Array.apply(null, Array(3)).map((_: any, index: number) => (
        <GridItem key={index}>
          <Skeleton
            rounded={"0.8rem"}
            w="full"
            h="96"
            key={index}
            startColor="blackAlpha.100"
            endColor="blackAlpha.500"
          />
        </GridItem>
      ))}
    </Grid>
  );
}
