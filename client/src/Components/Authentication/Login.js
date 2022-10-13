import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, USERLOGINFAIL, USERLOGINREQUEST, USERLOGINSUCCESS } from '../../Actions/userActions';

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const checkcookie= async()=>{
        const { data } = await axios.get(
          "http://localhost:5000/user/checkcookie",
          { withCredentials: true, credentials: "include" }
        );
        if(data)
        {
          dispatch(USERLOGINSUCCESS(data))
          navigate("/tasks")
        }
    }
    useEffect(() => {
        checkcookie()
    }, [])
    
    const submitHandler = async () => {
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
        try {
          dispatch(USERLOGINREQUEST())
          const { data } = await axios.post(
            "http://localhost:5000/user/login",
            { email, password },
            { withCredentials: true, credentials: "include" }
          );
          dispatch(USERLOGINSUCCESS(data))
          if(data){
            toast({
              title: "Login Successfully",
              description: "Login Successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            navigate("/tasks")
          }
        } catch (error) {
          dispatch(USERLOGINFAIL(error))
          toast({
            title: "Error Occured!",
            description: "Invalid credentials",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      };
  return (
    <VStack spacing="10px">
    <FormControl id="loginemail" isRequired>
      <FormLabel>Email Address</FormLabel>
      <Input
        value={email}
        type="email"
        placeholder="Enter Your Email Address"
        onChange={(e) => setEmail(e.target.value)} required
      />
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={show ? "text" : "password"}
          placeholder="Enter password" required
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    <Button
      colorScheme="blue"
      width="100%"
      style={{ marginTop: 15 }}
      onClick={submitHandler}
    >
      Login
    </Button>
  </VStack>
  )
}

export default Login