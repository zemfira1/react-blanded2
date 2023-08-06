import { Overlay } from 'components/Overlay/Overlay.styled';
import { useEffect } from 'react';

export const Modal = ({ imageLink, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      closeModal('');
    }
  };

  return (
    <Overlay onClick={handleClick}>
      <img width="70%" src={imageLink} alt="" />
    </Overlay>
  );
};
