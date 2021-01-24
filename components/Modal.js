import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
