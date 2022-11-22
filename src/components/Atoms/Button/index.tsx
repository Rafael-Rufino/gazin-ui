import { Button as ButtonChakra } from "@chakra-ui/react";
import "./Button.scss";

export const Button = () => {
  return (
    <ButtonChakra h="54px" colorScheme="blue" variant="solid">
      Email
    </ButtonChakra>
  );
};
