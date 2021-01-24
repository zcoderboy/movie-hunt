import MultiSelectSort from './MultiSelect';
import {
  Select,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  HStack,
  FormHelperText,
  Text,
  Input,
  Button,
  Box
} from '@chakra-ui/react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import validationSchema from './preferences.validation';
import supabase from '../../lib/supabaseClient';

const PreferencesFrom = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [success, setSuccess] = useState(false);

  const transformToOption = (data) => {
    data.forEach((item) => {
      item.value = item.name.toLowerCase();
      item.label = item.name;
    });
    return data;
  };

  const getGenres = useCallback(async () => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_IMDB_BASE_URL}/genre/movie/list`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMDB_TOKEN}`
      }
    });
    let data = await response.json();
    setGenres(transformToOption(data.genres));
  }, []);

  const savePreferences = async (values) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userId = supabase.auth.user().id;
        await supabase.from('preferences').delete().eq('user_id', userId);
        const { data } = await supabase.from('preferences').insert(
          [
            {
              user_id: userId,
              value: JSON.stringify(values)
            }
          ],
          { upsert: true }
        );
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      genres: [],
      network: '',
      yearMin: '',
      yearMax: '',
      rateMin: '',
      rateMax: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formik.values.genres = selectedGenres;
      savePreferences(values).then((data) => {
        setSuccess(true);
      });
    }
  });
  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      {success && (
        <Box bg="#c9f6cd" color="green" border="1px solid green" p="1rem" borderRadius="8px" mb="3">
          <Text>Your preferences was successfully saved 🥳</Text>
        </Box>
      )}
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
              <option selected>Netflix</option>
              <option>Amazon Prime Video</option>
            </Select>
            {formik.touched.network && formik.errors.network ? (
              <Text as="span" color="#DE0913" mt="2" d="block" fontSize="14px">
                {formik.errors.network}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel>Year - Between</FormLabel>
            <HStack align="top">
              <VStack flex="1" align="start">
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
              </VStack>
              <Text as="span">and</Text>
              <VStack flex="1" align="start">
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
                    placeholder="2021"
                    name="yearMax"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.yearMax}
                  />
                </InputGroup>
                {formik.touched.yearMax && formik.errors.yearMax ? (
                  <Text as="span" color="#DE0913" mt="2" d="block" fontSize="14px">
                    {formik.errors.yearMax}
                  </Text>
                ) : null}
              </VStack>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>Rate - Between</FormLabel>
            <HStack align="top">
              <VStack flex="1" align="start">
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
              </VStack>
              <Text as="span">and</Text>
              <VStack flex="1" align="start">
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
                    placeholder="5"
                    max="10"
                    min="1"
                    name="rateMax"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rateMax}
                  />
                </InputGroup>
                {formik.touched.rateMax && formik.errors.rateMax ? (
                  <Text as="span" color="#DE0913" mt="2" d="block" fontSize="14px">
                    {formik.errors.rateMax}
                  </Text>
                ) : null}
              </VStack>
            </HStack>
          </FormControl>
          <Button type="submit" colorScheme="green">
            Save
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default PreferencesFrom;
