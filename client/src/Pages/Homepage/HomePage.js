import { Box,Container,Tab,TabList,TabPanel,TabPanels,Tabs,Text} from "@chakra-ui/react";
import Login from "../../Components/Authentication/Login";
import Signup from "../../Components/Authentication/Signup";
//   import { useHistory } from "react-router";
  
  function Homepage() {
    // const history = useHistory();
  
    // useEffect(() => {
    //   const user = JSON.parse(localStorage.getItem("userInfo"));
  
    //   if (user) history.push("/chats");
    // }, [history]);
  
    return (
      <Container maxW="xl" height={"100vh"} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems={"center"}>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="Work sans" textAlign={"center"}>
            Task Reminder
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    );
  }
  
  export default Homepage;