import {
  Text,
  Movie,
  Box,
  VStack,
  useDisclosure,
  useBreakpointValue as bp,
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
          d={bp({ base: 'none', lg: 'block' })}
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
            <Text>{releaseDate ? releaseDate.split('-')[0] : '---'}</Text>
            <Text fontSize="14px">{description.substr(0, 100) + '...'}</Text>
          </VStack>
        </Box>
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} title={title} size="xl">
        <HStack h="100%" align="top" spacing="2rem" flexDir={bp({ base: 'column', lg: 'row' })}>
          <VStack spacing="1rem" align="left">
            <ChakraImage
              w="300px"
              h="400px"
              src={`${imgBaseUrl}${poster}`}
              alt="show-img"
              objectFit="cover"
              className={styles.movieCardImg}
            />
            <HStack>
              <Text>Watch now on </Text>
              {extra.provider === 'NETFLIX' && (
                <Link href={extra.providerUrl} target="blank">
                  <ChakraImage
                    w="40px"
                    h="40px"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEL0lEQVR4Ab3YA5DsWgKA4e+cJOOZvfbatm3btm17C2vbfrZt27aNcXdyXld18am7k7n3q2pGf1UcDT0Ub8f38Fdsr/v6O36Ad+GRGggG93C8Ga/R/8LPwi7YGidsrsAn4xt4hWb2x/dwyFIFFvgRPmNp/Qlfws1NAh+BHfEAm8dVeB2OrBP4Euxpy3grthok8EXY25b1RmwHABDd0f16xX1teeGfa4f8avWQ33Zef10zZH0WAMA7JwrfWjbkM1NDvtL5/HjncyQEd2NbPL5XYNbP3vWm8dy7OmGf7IR+bEXhfZ3YN0xkAODVY7lOlPdMFj40OeQdneAhPR2I8bsL/BU26uGY+aSar1zTqly1WLFQedV4BgCuLJML2pVLOq+LOq/LOq9KT5P4x10FPhQf04cb21zTZjTS/Z08dyzzoCLS3BvwDO4Y+Ht9qnBFiwiYS2R58I7JzBL5I0AE3BvP1qeJyHVtbinJAxHK5KVjSxb4MDwGIuAD9G80MlNxdXc1gxvayWNHogcWAQSNfRQi4O30LyDgkhYxkTCvu5rfOZmDMjWOfBNCxP1xX/pXYlnOVS2ubTMciGi1K6+fyMC1ZRI0sgxPjniaAaXEWHc1u3CR8QjcUPKwkehpnde5i0mFoJGnRjxUDSExGrmsRQWoIPDq8dytJa1E1Mh9IjYYUEKFVVl3FV/dYiQQMNtOXjoePaiIrmwnMWhiZcSUGipMZExXnLfQ/Z5wU8UjhoPHjgQXLRI1MhbVlBAwGblgkTIRENBK3G+YhUSJoL6IW9VUYWMRnNMpOW0+WZYRcGvF/Ya4R8bNJVFS01zElWpKiRU5l5fJPrOVkSyosJhYlbM255o2WVDXDRFnq6lCTicm2Gm61CqTYQRUuNcQrURS28URR6gpAR40xDGLpYNnKyvyAKbL7mpelnFrGQS1HB1xNi7TwPIIbDXdFrIgoaUbt7HgppLMwKZxRAT8X00JWQB2nim128loIKCVWJ+TkAxsB5QR8BcNRERcV3L4XGlZHiTMJdYXTEVmKoKB/B4i4Bwcp6YkGArA1reWhCChnZjMWFcwXRGDfl2EoyAC4EMaCWDb6dIti5WpQMBiYkORFIGU9OtDABEAJ+LfdbIiAK6rkt1mSxNFBPMVq/NgZcZM0o+9se8dA4EP4yY9rMuC++XRvfNgU+e1MgYBALvOlOTBuiJYW0TFcPTk0aDUU4m3A0AOAJjDc3GiuxCw31zpiPnSBe3KdOLasrKQEoAdpktvvGjOaAyWRR5QRDlGA3PJ3XkRru/n0cebsPVdBSa91Zj2Q/gzAECAXpFbwIfxJxgkEJ6GnbDa5jGLN2BPqBMIK/EzvMvS2h6fxaXQJBDgpfgGnqaZE/F97KgPweCehnfgVdioP1djd/wXB9hCIp6OT+Kn+Ce2xw74F36Oz+DZKNR0G9LyYOtXWmbtAAAAAElFTkSuQmCC"
                  />
                </Link>
              )}
              {extra.provider === 'AMAZON PRIME VIDEO' && (
                <Link href={extra.providerUrl} target="blank">
                  <ChakraImage
                    w="40px"
                    h="40px"
                    src="data:image/png;base64,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"
                  />
                </Link>
              )}
            </HStack>
          </VStack>
          <VStack
            spacing="3"
            width={bp({ base: '100%', lg: '50%' })}
            align="left"
            ml={bp({ base: '0 !important', lg: 'auto' })}
            mt={bp({ base: '1.5rem !important', lg: '0rem' })}>
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
                {extra.data.genres.map((genre, index) => {
                  return (
                    <Badge key={index} variant="outline" colorScheme="primary" p=".3rem">
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
                  w={bp({ base: '100%', lg: '50%' })}
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
              <Text>{releaseDate ? releaseDate.split('-')[0] : '---'}</Text>
            </Box>
          </VStack>
        </HStack>
      </Modal>
    </>
  );
};

export default MovieCard;
