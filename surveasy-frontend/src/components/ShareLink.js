import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  useClipboard,
  Tooltip,
} from "@chakra-ui/react";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import tinyurl from "tinyurl";
import { Link } from "react-router-dom";

const ShareLink = ({ surveyID }) => {
  const URL = window.location.origin + "/survey/" + surveyID;
  const [shortURL, setShortURL] = useState("");
  const urlCopy = useClipboard(URL);
  const shortURLCopy = useClipboard(shortURL);
  useEffect(() => {
    tinyurl.shorten(URL, function (res, err) {
      if (!err) {
        setShortURL(res);
      }
    });
  }, []);
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <Text fontSize="lg" fontWeight="medium" mb={1}>
          Complete URL{" "}
          <Link
            to={`/survey/${surveyID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon as={FaExternalLinkAlt} color="teal.500" mb={1.5} ml={1} />
          </Link>
        </Text>
        <InputGroup>
          <Input isReadOnly value={URL} />
          <InputRightElement>
            <Tooltip
              label="Copied!"
              placement="top"
              isOpen={urlCopy.hasCopied}
              hasArrow
            >
              <Button
                backgroundColor="transparent"
                _hover={{ backgroundColor: "transparent" }}
                onClick={urlCopy.onCopy}
              >
                <Icon
                  as={FaCopy}
                  color="teal.500"
                  _hover={{ color: "teal.400" }}
                />
              </Button>
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      </Flex>
      {shortURL.length !== 0 && (
        <Flex flexDirection="column" my={2}>
          <Text fontSize="lg" fontWeight="medium" mb={1}>
            Shortened URL{" "}
            <Icon
              as={FaExternalLinkAlt}
              color="teal.500"
              mb={1.5}
              ml={1}
              cursor="pointer"
              onClick={() => {
                window.open(shortURL, "_blank");
              }}
            />
          </Text>
          <InputGroup>
            <Input isReadOnly value={shortURL} />
            <InputRightElement>
              <Tooltip
                label="Copied!"
                placement="top"
                isOpen={shortURLCopy.hasCopied}
                hasArrow
              >
                <Button
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "transparent" }}
                  onClick={shortURLCopy.onCopy}
                >
                  <Icon
                    as={FaCopy}
                    color="teal.500"
                    _hover={{ color: "teal.400" }}
                  />
                </Button>
              </Tooltip>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Flex>
  );
};

export default ShareLink;
