import React from "react";
import { Divider, TextField, Typography } from '@mui/material';
import { SIDEBAR_STATICS } from "./SidebarStatics";
import { TYPOGRAPHY_VARIANT } from "../../statics/CommonEnums";
import { Draggable, Droppable } from "react-beautiful-dnd";

import './sidebar.scss';

const styles = {
  container: 'mit__scratch__task__sidebar__container',
  motionActionView: {
      container: 'mit__scratch__task__sidebar__motion__action__view__container',
      title: 'mit__scratch__task__sidebar__motion__action__view__title',
      buttonContainer: 'mit__scratch__task__sidebar__motion__action__view__button__container'
  },
  divider: 'mit__scratch__task__sidebar__divider',
  looksActionView: {
    container: 'mit__scratch__task__sidebar__looks__action__view__container',
    title: 'mit__scratch__task__sidebar__looks__action__view__title',
    buttonContainer: 'mit__scratch__task__sidebar__looks__action__view__button__container'
  },
  actionItemWrapper: 'mit__scratch__task__sidebar__action-item-wrapper',
  actionItem: 'mit__scratch__task__sidebar__action-item',
}


const Sidebar = () => {

  const getActionItem = (item, index) => (
    <Draggable 
      // id={`${item.id}-${index}`}
      // index={`${item.id}-${index}`}
      // key={`${item.id}-${index}`}
      // draggableId={item.id}
      id={item.id}
      index={index}
      key={`${item.id}-${index}`}
      draggableId={`${item.id}-${index}`}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.actionItemWrapper}
        >
          <Typography
            variant={TYPOGRAPHY_VARIANT.BODY1}
            className={styles.actionItem}
          >
           {item.label}
          </Typography>
        </div>
      )}
    </Draggable>
  );

  const getMotionActionView = () => (
    <div className={styles.motionActionView.container}>
      <Typography 
        variant={TYPOGRAPHY_VARIANT.H6} 
        className={styles.motionActionView.title}
      >
         {SIDEBAR_STATICS.MOTION_ACTION_CONTAINER.title}
      </Typography>
      <div className={styles.motionActionView.buttonContainer}>
        {SIDEBAR_STATICS.MOTION_ACTION_CONTAINER.CTA_LIST.map(getActionItem)}
      </div>
    </div>
  )

  const getLooksActionView = () => (
    <div className={styles.looksActionView.container}>
      <Typography 
        variant={TYPOGRAPHY_VARIANT.H6} 
        className={styles.looksActionView.title}
      >
         {SIDEBAR_STATICS.LOOKS_ACTION_CONTAINER.title}
      </Typography>
      <div className={styles.looksActionView.buttonContainer}>
        {SIDEBAR_STATICS.LOOKS_ACTION_CONTAINER.CTA_LIST.map(getActionItem)}
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <Droppable droppableId="sidebar">
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {getMotionActionView()}
            <Divider/>
            {getLooksActionView()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export { Sidebar };