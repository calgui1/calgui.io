import Layout from "../components/layouts/article"
import React, { useState } from "react"
import {
  Box, 
  Container, 
  Heading,
  FormControl, 
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  useColorModeValue,
  Button,
  Text
} from "@chakra-ui/react"
import {  } from "@chakra-ui/react"

const Contact = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidSubject, setIsValidSubject] = useState(true);
  const [isValidMessage, setIsValidMessage] = useState(true);

  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Submit");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;
    setIsSubmitting(true)

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
      setIsValidName(false);
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
      setIsValidEmail(false);
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
      setIsValidSubject(false);
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
      setIsValidMessage(false);
    }

    setErrors({ ...tempErrors });
    //console.log("errors", errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Submit");
        setIsSubmitting(false);
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Submit");
      setIsSubmitting(false);

      setEmail('');
      setFullName('');
      setSubject('');
      setMessage('');
    } else {
      setIsSubmitting(false);
      setShowFailureMessage(true);
    }
    
    //console.log(fullname, email, subject, message);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  }
  const handleNameChange = (e) => {
    setFullName(e.target.value);
    setIsValidName(true);
  }
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setIsValidSubject(true);
  }
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setIsValidMessage(true);
  }


  return (
    <Layout title="Contact">
      <Container maxW="container.md" mt={10}>
        <Heading variant="page-title">
          Say Hello
        </Heading>
        <Box maxW="container.md" bg={useColorModeValue("#00000040","#22222299")} borderRadius={10} mt={10} p={10}>
          {showSuccessMessage ? (
            <Text color='green'>
              Message Sent
            </Text>
          ) : ('')}
          {showFailureMessage ? (
            <Text color='red'>
              Message could not be sent
            </Text>
          ) : ('')}
          <FormControl isRequired pt={3} pb={5} isInvalid={!isValidEmail}>
            <FormLabel>Email Address</FormLabel>
            <Input type='email' value={email} onChange={handleEmailChange}/>
            {!isValidEmail ? (<FormErrorMessage>Email is required</FormErrorMessage>) : ('')}
          </FormControl>
          <FormControl isRequired pb={5} isInvalid={!isValidName}>
            <FormLabel>Name</FormLabel>
            <Input value={fullname} onChange={handleNameChange} />
            {!isValidName ? (<FormErrorMessage>Name is required</FormErrorMessage>) : ('')}
          </FormControl>
          <FormControl isRequired pb={5} isInvalid={!isValidSubject}>
            <FormLabel>Subject</FormLabel>
            <Input value={subject} onChange={handleSubjectChange} />
            {!isValidSubject ? (<FormErrorMessage>Subject is required</FormErrorMessage>) : ('')}
          </FormControl>
          <FormControl isRequired pb={5} isInvalid={!isValidMessage}>
            <FormLabel>Message</FormLabel>
            <Textarea value={message} onChange={handleMessageChange} />
            {!isValidMessage ? (<FormErrorMessage>Message is required</FormErrorMessage>) : ('')}
          </FormControl>
          <Box align='center'>
            <Button isLoading={isSubmitting} loadingText='Submitting' colorScheme='teal' onClick={handleSubmit}>
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default Contact