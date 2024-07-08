import React, { useEffect } from "react";
import { Card, Typography, Button, Divider } from "@mui/material";
import stringTemplate from 'string-template';
import { PlayArrow } from "@mui/icons-material";
import { v4 as uuidV4} from 'uuid';
import classNames from 'classnames';

import { BUTTON_SIZE, BUTTON_VARIANT, CARD_VARIANT, TYPOGRAPHY_VARIANT } from "../../statics/CommonEnums";
import { MID_AREA_STATICS } from "./MidAreaStatics";

import './mid-area.scss'

const styles = {
  container: 'mit__scratch__task__mid-area__container',
  header: {
    container: 'mit__scratch__task__mid-area__header__container',
    title: 'mit__scratch__task__mid-area__header__title',
    addCta: 'mit__scratch__task__mid-area__header__add-cta',
  },
  actionCardListWrapper: 'mit__scratch__task__mid-area__action-card-list-wrapper',
  actionCard: {
    container: 'mit__scratch__task__mid-area__action-card__container',
    headerContainer: 'mit__scratch__task__mid-area__action-card__header-container',
    title: 'mit__scratch__task__mid-area__action-card__title',
    runAllActionCta: 'mit__scratch__task__mid-area__action-card__run-all-action-cta',
    actionItem: 'mit__scratch__task__mid-area__action-card__action-item',
  }
}

const MidArea = (props) => {
  const { 
    actionCard,
    actionCardIds,
    setActionCardIds,
    setActionCard,
    className
  } = props;

  //todo remove
  useEffect(() => {
    console.log(actionCard);
    console.log(actionCardIds);    
  },[actionCard, actionCardIds])

  const handleAddActionCard = () => {
    const uniqueId = uuidV4();

    setActionCardIds((prevState) => ([
      ...prevState,
      uniqueId,
    ]));

    setActionCard((prevState) => ({
      ...prevState,
      [uniqueId]: {
        id: uniqueId,
        actionItem: [],
      },
    }))
  }

  const handleRunActionCard = () => {
    
  }

  const getHeaderView = () => (
    <div className={styles.header.container}>
      <Typography
        variant={TYPOGRAPHY_VARIANT.H5}
        className={styles.header.title}
      >
        {MID_AREA_STATICS.HEADER.title}
      </Typography>
      <Button
        variant={BUTTON_VARIANT.OUTLINED}
        size={BUTTON_SIZE.LARGE}
        className={styles.header.addCta}
        onClick={handleAddActionCard}
      >
        {MID_AREA_STATICS.HEADER.addNewListCta}
      </Button>
    </div>
  )

  const getCardHeaderView = (index) => (
    <div className={styles.actionCard.headerContainer}>
      <Typography
        variant={TYPOGRAPHY_VARIANT.H6}
        className={styles.actionCard.title}
      >
        {stringTemplate(MID_AREA_STATICS.ACTION_CARD.title, {
          number: index + 1,
        })}
      </Typography>
      <Button
        variant={BUTTON_VARIANT.CONTAINED}
        size={BUTTON_SIZE.SMALL}
        endIcon={<PlayArrow/>}
        onClick={handleRunActionCard}
        className={styles.actionCard.runAllActionCta}
      >
        {MID_AREA_STATICS.ACTION_CARD.runActionCta}
      </Button>
    </div>
  );

  const getActionCta = (item, index) => (
    <Draggable 
      id={item.id}
      index={index}
      key={item.id}
      draggableId={item.id}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.actionItemWrapper}
        >
          {/* <TextField label={}/> */}
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

  
  const getActionCard = ( cardId, index ) => (
    <Card 
      key={cardId}
      variant={CARD_VARIANT.OUTLINED}
      className={styles.actionCard.container}
    >
      {getCardHeaderView(index)}
      <Divider/>
      {actionCard[cardId]?.actionItem?.map(getActionCta)}
    </Card>
  );

  const getActionCardListView = () => (
      <div className={styles.actionCardListWrapper}>
        {actionCardIds?.map(getActionCard)}
      </div>
  );
  

  return (
    <div className={classNames(styles.container, className)}>
      {getHeaderView()}
      {getActionCardListView()}
    </div>
  )
}

export { MidArea };