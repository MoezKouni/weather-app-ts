import { ChangeEvent } from "react";
import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { debounce } from "../../utils/debounce";
import { Search2Icon } from "@chakra-ui/icons";

type Props = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchField({ handleChange }: Props) {
  const { isLoading } = useSelector((state: any) => state.weather);

  return (
    <InputGroup maxW={"sm"} bg="blackAlpha.400" backdropFilter={"blur(5px)"} rounded="full">
      <InputLeftElement
        pointerEvents="none"
        children={
          isLoading ? (
            <Spinner size={"sm"} color="white" />
          ) : (
            <Search2Icon color="gray"/>
          )
        }
      />
      <Input
        type={"text"}
        onChange={debounce(handleChange, 500)}
        placeholder={"Search..."}
        variant="outline"
        rounded="full"
        color="white"
        // _placeholder={{color: "black"}}
        _focus={{}}
        border="none"
      />
    </InputGroup>
  );
}
