import MyFlow from "./MyFlow";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
  return (
    <>
      <MantineProvider defaultColorScheme="light">
        <MyFlow />
      </MantineProvider>
    </>
  );
}

export default App;
