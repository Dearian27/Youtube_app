import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReplyIcon from '@mui/icons-material/Reply';


const ShareModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const url = window.location.href;
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleShareClick = (e: React.MouseEvent<HTMLAnchorElement>,
    site: string) => {
    e.preventDefault();
    const shareUrl = getShareUrl(site, url);
    window.open(shareUrl, '_blank');
  };

  return (
    <>
      <Button onClick={openModal}><ReplyIcon style={{ height: "30px", width: "30px", fill: `${({ theme }: { theme: any }) => theme.theme === "light" ? "black" : "white"}` }} />Share</Button>
      {isOpen && (
        <ModalBackdrop onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Поділитися</ModalTitle>
              <CloseButton onClick={closeModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <ShareLink onClick={(e) => handleShareClick(e, 'facebook')}>
                Facebook
              </ShareLink>
              <ShareLink onClick={(e) => handleShareClick(e, 'twitter')}>
                Twitter
              </ShareLink>
              <ShareLink onClick={(e) => handleShareClick(e, 'telegram')}>
                Telegram
              </ShareLink>
              {/* Додайте інші соціальні мережі */}
            </ModalBody>
          </Modal>
        </ModalBackdrop>
      )}
    </>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`



const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  width: 400px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #ccc;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 24px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const ShareLink = styled.a`
  color: #333;
  text-decoration: none;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const getShareUrl = (site: string, url: string) => {
  switch (site) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    case 'telegram':
      return `https://t.me/share/url?url=${encodeURIComponent(url)}`;
    // Додайте інші соціальні мережі
    default:
      return '';
  }
};

export default ShareModal;


