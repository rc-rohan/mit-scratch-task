import React from "react";
import { Typography } from '@mui/material';
import { SIDEBAR_STATICS } from "./SidebarStatics";
import { TYPOGRAPHY_VARIANT } from "../../statics/CommonEnums";
import { Droppable } from "react-beautiful-dnd";

import './sidebar.scss';
import { ACTION_CTA_LIST } from "../../statics/GlobalStatics";
import { ActionCta } from "../ActionCta/ActionCta";

const styles = {
  container: 'mit__scratch__task__sidebar__container',
  header: 'mit__scratch__task__sidebar__header',
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


const Sidebar = (props) => {
  const { onActionCtaClick } = props;

  const getHeaderView = () => (
    <Typography
      variant={TYPOGRAPHY_VARIANT.H6}
      className={styles.header}
    >
      {SIDEBAR_STATICS.header}
    </Typography>
  )

  const getActionItem = (item, index) => (
    <ActionCta
      id={`sidebar-item-${index}-${item.id}`}
      onActionCtaClick={onActionCtaClick}
      ctaData={item}
      index={index}
      key={`${index}-sidebar`}
    />
  );

  const getActionCtaView = () => (
    <div className={styles.motionActionView.container}>
        {ACTION_CTA_LIST.map(getActionItem)}
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
            {getHeaderView()}
            {getActionCtaView()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export { Sidebar };