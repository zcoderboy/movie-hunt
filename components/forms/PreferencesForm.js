import MultiSelectSort from './MultiSelect';
import {
  Select,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Text,
  Input,
  Button,
  Box
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import validationSchema from './preferences.validation';
import useUser from '../../utils/useUser';

const PreferencesFrom = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [success, setSuccess] = useState(false);
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  const transformToOption = (data) => {
    data.forEach((item) => {
      item.value = item.name.toLowerCase();
      item.label = item.name;
    });
    return data;
  };

  const getGenres = useCallback(async () => {
    let response = await fetch('/api/getGenres');
    if (response.ok) {
      let data = await response.json();
      setGenres(transformToOption(data));
    }
  }, []);

  const savePreferences = async (values) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch('/api/savePreferences', {
          method: 'POST',
          body: JSON.stringify({
            user_id: user.id,
            value: JSON.stringify(values)
          })
        });
        if (response.ok) {
          resolve(await response.json());
        } else {
          throw 'Failed to save preferences';
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const getPreferences = useCallback(async () => {
    const response = await fetch('/api/getPreferences');
    if (response.ok) {
      return await response.json();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      genres: [],
      network: 'ANY',
      yearMin: '2000',
      rateMin: '1'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formik.values.genres = selectedGenres;
      setIsLoading(true);
      savePreferences(values)
        .then((data) => {
          setSuccess(true);
          setIsLoading(false);
          if (router.pathname === '/account/discover') {
            window.location.reload();
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert('Failed to save preferences');
        });
    }
  });

  useEffect(() => {
    getGenres();
    getPreferences().then((data) => {
      setRender(true);
      if (data) {
        formik.values.network = data.network ? data.network : formik.values.yearMin;
        formik.values.yearMin = data.yearMin ? data.yearMin : formik.values.yearMin;
        formik.values.rateMin = data.rateMin ? data.rateMin : formik.values.rateMin;
        setSelectedGenres(data.genres);
      }
    });
  }, []);

  return (
    <>
      {success && (
        <Box bg="#c9f6cd" color="green" border="1px solid green" p="1rem" borderRadius="8px" mb="3">
          <Text>Your preferences was successfully saved 🥳</Text>
        </Box>
      )}
      {render && (
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing="1.5rem" align="left">
            <FormControl>
              <FormLabel>Genres</FormLabel>
              <MultiSelectSort
                placeholder="Adventure"
                data={genres}
                selected={selectedGenres}
                setSelected={setSelectedGenres}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Streaming service</FormLabel>
              <Select
                focusBorderColor="#F97B2F"
                placeholder=""
                h="3rem"
                name="network"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.network}>
                <option value="NETFLIX">Netflix</option>
                <option value="AMAZON PRIME VIDEO">Amazon Prime Video</option>
                <option value="ANY">Any</option>
              </Select>
              {formik.touched.network && formik.errors.network ? (
                <Text as="span" color="#DE0913" mt="2" d="block" fontSize="14px">
                  {formik.errors.network}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel>Year Min.</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  pos="absolute"
                  zIndex="-1"
                  children={<FaRegCalendarAlt color="#ddd" />}
                />
                <Input
                  focusBorderColor="#F97B2F"
                  type="number"
                  placeholder="2010"
                  inputMode="numeric"
                  name="yearMin"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.yearMin}
                />
              </InputGroup>
              {formik.touched.yearMin && formik.errors.yearMin ? (
                <Text as="span" color="#DE0913" mt="2" d="block" fontSize="14px">
                  {formik.errors.yearMin}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel>Rate Min.</FormLabel>
              <InputGroup d="flex" flexDir="column">
                <InputLeftElement
                  pointerEvents="none"
                  pos="absolute"
                  zIndex="-1"
                  children={<AiFillStar color="#ddd" />}
                />
                <Input
                  focusBorderColor="#F97B2F"
                  type="number"
                  placeholder="3"
                  min="1"
                  max="10"
                  inputMode="numeric"
                  name="rateMin"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rateMin}
                />
              </InputGroup>
              {formik.touched.rateMin && formik.errors.rateMin ? (
                <Text as="span" color="#DE0913" mt="2" d="block" fontSize="14px">
                  {formik.errors.rateMin}
                </Text>
              ) : null}
            </FormControl>
            <Button
              isLoading={isLoading}
              type="submit"
              colorScheme="green"
              loadingText="Submitting...">
              Save
            </Button>
          </VStack>
        </form>
      )}
      {!render && (
        <Button
          isLoading={true}
          size="xl"
          loadingText="Fetching your preferences..."
          variant="ghost"
          d="flex"
          w="100%"
          justifyContent="center"
        />
      )}
    </>
  );
};

export default PreferencesFrom;
