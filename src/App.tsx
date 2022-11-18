import { Flex } from "@chakra-ui/react";
import { Checkbox } from "./components";
import { Button } from "./components/Atoms/Button";

function App() {
  return (
    <Flex flexDirection="column">
      <Button />
      <Checkbox />
    </Flex>
  );
}

export default App;
