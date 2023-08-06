import { Overlay } from 'components/Overlay/Overlay.styled';

export const Modal = ({ imageLink }) => {
  return (
    <Overlay>
      <img src={imageLink} alt="" />
    </Overlay>
  );
};
