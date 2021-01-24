import { Text, Movie, Box } from '@chakra-ui/react';
import { TiArrowRight } from 'react-icons/ti';
import styles from './Card.module.scss';
import Image from 'next/image';

const MovieCard = ({ poster }) => {
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  return (
    <Box pos="relative">
      <Image
        src={`${imgBaseUrl}${poster}`}
        width={250}
        height={350}
        alt="movie"
        objectFit="cover"
        layout="responsive"
        className={styles.movieCardImg}
      />
      <Box
        w="40px"
        h="40px"
        d="flex"
        justifyContent="center"
        alignItems="center"
        pos="absolute"
        bg="white"
        boxShadow=""
        right="-18px"
        top="50%"
        borderRadius="50%"
        cursor="pointer"
        boxShadow="0 .5rem 1rem rgba(0,0,0,.15)">
        <Box as={TiArrowRight} boxSize="25px" color="primary.500" />
      </Box>
    </Box>
  );
};

export default MovieCard;
