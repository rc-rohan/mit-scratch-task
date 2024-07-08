import React, { forwardRef } from "react";
import CatSprite from "../CatSprite";

import './preview-area.scss';

const styles = {
  container: 'mit__scratch__task__preview-area__container',
  spriteWrapper: 'mit__scratch__task__preview-area__sprite-wrapper'
}

const  PreviewArea = forwardRef((props, ref) => {
  const { spriteStyles, spriteId } = props;

  console.log('ref', ref);

  const getSpriteView = () => (
    <div 
      id={spriteId}
      ref={ref}
      style={{
        ...spriteStyles,
      }}
      className={styles.spriteWrapper}
    >
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
