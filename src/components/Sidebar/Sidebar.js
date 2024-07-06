import React from "react";
import { Button, Divider, Typography } from '@mui/material';
import { SIDEBAR_STATICS } from "./SidebarStatics";

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
  actionItem: 'mit__scratch__task__sidebar___action__item',
}


const Sidebar = () => {

  const getActionItem = (item) => (
      <Button
        variant='contained'
        size='large'
        // onClick={onConnectNowCtaClick}
        className={styles.actionItem}
      >
        {item.label}
      </Button>
  );

  const getMotionActionView = () => (
    <div className={styles.motionActionView.container}>
      <Typography 
        variant="h6" 
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
        variant="h6" 
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
      {getMotionActionView()}
      <Divider/>
      {getLooksActionView()}
    </div>
  );
}

export { Sidebar };