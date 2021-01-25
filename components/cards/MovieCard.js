import {
  Text,
  Movie,
  Box,
  VStack,
  useDisclosure,
  HStack,
  Progress,
  Badge,
  Image as ChakraImage,
  Link
} from '@chakra-ui/react';
import { TiArrowRight } from 'react-icons/ti';
import styles from './Card.module.scss';
import Image from 'next/image';
import { useRef } from 'react';
import Modal from '../Modal';

const MovieCard = ({ poster, description, releaseDate, title, extra }) => {
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const descRef = useRef(null);
  console.log(extra);
  const getProgressColor = (value) => {
    if (value >= 0 && value < 50) {
      return 'red';
    } else if (value >= 50 && value < 70) {
      return 'yellow';
    }
    return 'green';
  };

  const showDesc = () => {
    descRef.current.style.top = '50%';
  };
  const hideDesc = () => {
    descRef.current.style.top = '100%';
  };
  return (
    <>
      <Box pos="relative" onMouseEnter={showDesc} onMouseLeave={hideDesc} overflow="hidden">
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
          right="-0px"
          top="50%"
          borderTopLeftRadius="4px"
          zIndex="2"
          borderBottomLeftRadius="4px"
          cursor="pointer"
          onClick={onOpen}
          boxShadow="0 .5rem 1rem rgba(0,0,0,.15)">
          <Box as={TiArrowRight} boxSize="30px" color="primary.500" />
        </Box>
        <Box
          pos="absolute"
          top="100%"
          bg="rgba(0,0,0,0.5)"
          w="100%"
          h="50%"
          ref={descRef}
          color="#fff"
          transition=".4s"
          padding="1rem"
          borderRadius="4px"
          zIndex="0">
          <VStack spacing=".5rem" align="left">
            <Text fontWeight="bold">{title}</Text>
            <Text>{releaseDate.split('-')[0]}</Text>
            <Text fontSize="14px">{description.substr(0, 100) + '...'}</Text>
          </VStack>
        </Box>
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} title={title} size="full">
        <HStack h="100%" align="top" spacing="2rem">
          <ChakraImage
            w="300px"
            h="400px"
            src={`${imgBaseUrl}${poster}`}
            alt="show-img"
            objectFit="cover"
            className={styles.movieCardImg}
          />
          <VStack spacing="3" width="50%" align="left">
            <Box>
              <Text mb="2" fontSize="md1" fontWeight="bold">
                Synopsis
              </Text>
              <Text>{description}</Text>
            </Box>
            <Box>
              <Text mb="2" fontSize="md1" fontWeight="bold">
                Genres
              </Text>
              <HStack>
                {extra.data.genres.map((genre) => {
                  return (
                    <Badge variant="outline" colorScheme="primary" p=".3rem">
                      {genre.name}
                    </Badge>
                  );
                })}
              </HStack>
            </Box>
            <Box>
              <Text mb="2" fontSize="md1" fontWeight="bold">
                Rating
              </Text>
              <HStack>
                <Progress
                  w="50%"
                  value={extra.data.vote_average * 10}
                  max={100}
                  borderRadius="4px"
                  colorScheme={getProgressColor(extra.data.vote_average * 10)}
                />
                <Text>{extra.data.vote_average}</Text>
              </HStack>
            </Box>
            <Box>
              <Text mb="2" fontSize="md1" fontWeight="bold">
                Year
              </Text>
              <Text>{releaseDate.split('-')[0]}</Text>
            </Box>
            <HStack>
              <Text>Watch now on </Text>
              <Link href={extra.providerUrl} target="blank">
                <ChakraImage
                  w="40px"
                  h="40px"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEL0lEQVR4Ab3YA5DsWgKA4e+cJOOZvfbatm3btm17C2vbfrZt27aNcXdyXld18am7k7n3q2pGf1UcDT0Ub8f38Fdsr/v6O36Ad+GRGggG93C8Ga/R/8LPwi7YGidsrsAn4xt4hWb2x/dwyFIFFvgRPmNp/Qlfws1NAh+BHfEAm8dVeB2OrBP4Euxpy3grthok8EXY25b1RmwHABDd0f16xX1teeGfa4f8avWQ33Zef10zZH0WAMA7JwrfWjbkM1NDvtL5/HjncyQEd2NbPL5XYNbP3vWm8dy7OmGf7IR+bEXhfZ3YN0xkAODVY7lOlPdMFj40OeQdneAhPR2I8bsL/BU26uGY+aSar1zTqly1WLFQedV4BgCuLJML2pVLOq+LOq/LOq9KT5P4x10FPhQf04cb21zTZjTS/Z08dyzzoCLS3BvwDO4Y+Ht9qnBFiwiYS2R58I7JzBL5I0AE3BvP1qeJyHVtbinJAxHK5KVjSxb4MDwGIuAD9G80MlNxdXc1gxvayWNHogcWAQSNfRQi4O30LyDgkhYxkTCvu5rfOZmDMjWOfBNCxP1xX/pXYlnOVS2ubTMciGi1K6+fyMC1ZRI0sgxPjniaAaXEWHc1u3CR8QjcUPKwkehpnde5i0mFoJGnRjxUDSExGrmsRQWoIPDq8dytJa1E1Mh9IjYYUEKFVVl3FV/dYiQQMNtOXjoePaiIrmwnMWhiZcSUGipMZExXnLfQ/Z5wU8UjhoPHjgQXLRI1MhbVlBAwGblgkTIRENBK3G+YhUSJoL6IW9VUYWMRnNMpOW0+WZYRcGvF/Ya4R8bNJVFS01zElWpKiRU5l5fJPrOVkSyosJhYlbM255o2WVDXDRFnq6lCTicm2Gm61CqTYQRUuNcQrURS28URR6gpAR40xDGLpYNnKyvyAKbL7mpelnFrGQS1HB1xNi7TwPIIbDXdFrIgoaUbt7HgppLMwKZxRAT8X00JWQB2nim128loIKCVWJ+TkAxsB5QR8BcNRERcV3L4XGlZHiTMJdYXTEVmKoKB/B4i4Bwcp6YkGArA1reWhCChnZjMWFcwXRGDfl2EoyAC4EMaCWDb6dIti5WpQMBiYkORFIGU9OtDABEAJ+LfdbIiAK6rkt1mSxNFBPMVq/NgZcZM0o+9se8dA4EP4yY9rMuC++XRvfNgU+e1MgYBALvOlOTBuiJYW0TFcPTk0aDUU4m3A0AOAJjDc3GiuxCw31zpiPnSBe3KdOLasrKQEoAdpktvvGjOaAyWRR5QRDlGA3PJ3XkRru/n0cebsPVdBSa91Zj2Q/gzAECAXpFbwIfxJxgkEJ6GnbDa5jGLN2BPqBMIK/EzvMvS2h6fxaXQJBDgpfgGnqaZE/F97KgPweCehnfgVdioP1djd/wXB9hCIp6OT+Kn+Ce2xw74F36Oz+DZKNR0G9LyYOtXWmbtAAAAAElFTkSuQmCC"
                />
              </Link>
            </HStack>
          </VStack>
        </HStack>
      </Modal>
    </>
  );
};

export default MovieCard;
