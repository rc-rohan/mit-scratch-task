import { TextField, Typography } from '@mui/material';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TYPOGRAPHY_VARIANT } from '../../statics/CommonEnums';

import './action-cta.scss';

const styles = {
  container: 'mit__scratch__task__action-cta__container',
  actionItem: 'mit__scratch__task__action-cta__action-item',
}

const ActionCta = (props) => {
  const { 
    ctaData,
    onActionCtaClick,
    index,
    id,
  } = props;

  const handleActionCtaPress = () => {
    onActionCtaClick([ctaData]);
  }

  return (
    <Draggable 
      id={ctaData.id}
      index={index}
      key={id}
      draggableId={id}
    >
      {(provided) => (
        <div
          onClick={handleActionCtaPress}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.container}
        >
          <Typography
            variant={TYPOGRAPHY_VARIANT.BODY1}
            className={styles.actionItem}
          >
           {ctaData.label}
          </Typography>
        </div>
      )}
    </Draggable>
  )
}

export { ActionCta };