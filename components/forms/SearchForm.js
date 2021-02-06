import {
  Select as CSelect,
  HStack,
  Input,
  chakra,
  Button,
  Box,
  Heading,
  useBreakpointValue as bp
} from '@chakra-ui/react';
import { SearchContext } from '../../context/SearchContext';
import { useContext, useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';

const RSelect = chakra(Select);

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '0.2px solid #eee',
    backgroundColor: state.isSelected ? '#eeeeee' : '#fff',
    color: '#000',
    fontSize: '14',
    padding: 10
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: '4px',
    boxShadow: 0,
    height: '3rem',
    border: state.isFocused ? '1px solid #F97B2F' : '1px solid #ced4da',
    '&:hover': {}
  }),
  container: (provided, state) => ({
    ...provided,
    flex: '1',
    width: '100%'
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: '#aaa'
  })
};

const SearchForm = () => {
  const { doSearch, result } = useContext(SearchContext);
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const formik = useFormik({
    initialValues: { genre: '', year: '', network: '' },
    validationSchema: Yup.object({
      network: Yup.string(),
      year: Yup.number().max(2021, 'Max. year is 2021').min(2000, 'Min. year is 2000')
    }),
    onSubmit: (values) => {
      const query = {};
      if (selected) {
        formik.values.genre = selected.id;
      }
      Object.keys(formik.values).forEach((key) => {
        if (formik.values[key]) {
          query[key] = formik.values[key];
        }
      });
      setIsLoading(true);
      if (Object.keys(query).length) {
        doSearch(query).then((data) => {
          if (data.length) {
            Router.push('/search');
          }
        });
      } else {
        setIsLoading(false);
      }
    }
  });
  useEffect(() => {
    getGenres();
    return () => {};
  }, []);

  return (
    <Box mb="3rem">
      <Heading fontSize={bp({ base: 'md2', lg: 'lg' })} as="h1">
        What are you looking for ?
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <HStack mt="4" flexDir={bp({ base: 'column', lg: 'row' })}>
          <RSelect
            onChange={(option) => setSelected(option)}
            styles={customStyles}
            placeholder="Genre"
            name="genre"
            mb={bp({ base: '1.5rem', lg: '0rem' })}
            options={genres}
          />
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.year}
            inputMode="numeric"
            flex="1"
            ml={bp({ base: '0 !important', lg: 'auto' })}
            mb={bp({ base: '1.5rem', lg: '0rem' })}
            name="year"
            focusBorderColor="#F97B2F"
            placeholder="Min. Year"
            h="3rem"
          />
          <CSelect
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.network}
            flex="1"
            mb={bp({ base: '1.5rem', lg: '0rem' })}
            ml={bp({ base: '0 !important', lg: 'auto' })}
            name="network"
            focusBorderColor="#F97B2F"
            placeholder="Streaming service"
            h="3rem">
            <option value="NETFLIX">Netflix</option>
            <option value="AMAZON PRIME VIDEO">Amazon Prime Video</option>
            <option value="ANY">Any</option>
          </CSelect>
          <Button
            isLoading={isLoading}
            loadingText="Searching..."
            type="submit"
            alignSelf={bp({ base: 'start' })}
            colorScheme="primary"
            p="1rem 4rem"
            h="3rem">
            Find
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default SearchForm;
