import React, { forwardRef } from "react";
import CatSprite from "../CatSprite";

import './preview-area.scss';
import { Typography } from "@mui/material";
import { TYPOGRAPHY_VARIANT } from "../../statics/CommonEnums";

const styles = {
  container: 'mit__scratch__task__preview-area__container',
  spriteWrapper: 'mit__scratch__task__preview-area__sprite-wrapper',
  messageContainer: 'mit__scratch__task__preview-area__message-container',
  messageText: 'mit__scratch__task__preview-area__message-text',
}

const  PreviewArea = forwardRef((props, ref) => {
  const { 
    spriteStyles,
    spriteId,
    message,
  } = props;

  console.log('ref', ref);

  const getMessageView = () => (
    <div className={styles.messageContainer}>
      <Typography 
        variant={TYPOGRAPHY_VARIANT.BODY2}
        className={styles.messageText}
      >
        {message}
      </Typography>
    </div>
  )

  const getSpriteView = () => (
    <div 
      id={spriteId}
      ref={ref}
      style={{
        ...spriteStyles,
      }}
      className={styles.spriteWrapper}
    >
      {message && getMessageView()}
      <CatSprite />
    </div>
  )

  return (
    <div
      className={styles.container}
    >
      {getSpriteView()}
    </div>
  );
})

export { PreviewArea };
