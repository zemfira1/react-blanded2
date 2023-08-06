import { Overlay } from 'components/Overlay/Overlay.styled';
import { RingLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <Overlay>
      <RingLoader color="#36d7b7" />
    </Overlay>
  );
};
