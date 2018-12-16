import React from 'react'
import { Header, Modal } from 'semantic-ui-react'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from 'react-share'

const ShareModal = ({
  open,
  onClose,
  snippet,
}) => (
  <Modal
  open={open}
  basic
  size='small'
  centered
  onClose={onClose}
  className='Share-modal'
  >
    <Header size='large' content={`🎉 Snippet "${snippet.id}" completed!`} />
    <Modal.Content content='Share the result.' />
    <Modal.Actions>
      <div className='Share-actions'>
        <FacebookShareButton
          url={window.location.href}
        ><FacebookIcon size={48} /></FacebookShareButton>
        <TwitterShareButton
          url={window.location.href}
        ><TwitterIcon size={48} /></TwitterShareButton>
        <LineShareButton
          url={window.location.href}
        ><LineIcon size={48} /></LineShareButton>
      </div>
      <span className='Share-close-button' onClick={onClose}>CLOSE</span>
    </Modal.Actions>
  </Modal>
)

export default ShareModal
