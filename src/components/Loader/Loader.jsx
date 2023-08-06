import { Overlay } from './Loader.styled';
import { RingLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <Overlay>
      <RingLoader color="#36d7b7" />
    </Overlay>
  );
};
