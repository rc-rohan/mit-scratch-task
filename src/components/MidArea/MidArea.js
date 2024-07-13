import React, { useEffect } from "react";
import { Card, Typography, Button, Divider } from "@mui/material";
import stringTemplate from 'string-template';
import { PlayArrow } from "@mui/icons-material";
import { v4 as uuidV4} from 'uuid';
import classNames from 'classnames';
import { Draggable, Droppable } from "react-beautiful-dnd";

import { BUTTON_SIZE, BUTTON_VARIANT, CARD_VARIANT, TYPOGRAPHY_VARIANT } from "../../statics/CommonEnums";
import { MID_AREA_STATICS } from "./MidAreaStatics";

import './mid-area.scss'
import { ActionCta } from "../ActionCta/ActionCta";

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
    actionItemWrapper: 'mit__scratch__task__mid-area__action-card__action-item-wrapper',
    placeHolderText: 'mit__scratch__task__mid-area__action-card__placeholder-text',
  }
}

const MidArea = (props) => {
  const { 
    actionCard,
    actionCardIds,
    setActionCardIds,
    setActionCard,
    onPlayActionCard,
    className
  } = props;

  useEffect(() => {
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
  },[])

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

  const handleRunActionCard = (cardId) => {
    onPlayActionCard(actionCard[cardId].actionItem)
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

  const getCardHeaderView = (index, cardId) => (
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
        onClick={() => handleRunActionCard(cardId)}
        className={styles.actionCard.runAllActionCta}
      >
        {MID_AREA_STATICS.ACTION_CARD.runActionCta}
      </Button>
    </div>
  );

  const getActionItem = (item, index) => (
    <ActionCta
      onActionCtaClick={onPlayActionCard}
      ctaData={item}
      index={index}
      key={index}
      id={`actionCard-item-${index}-${item.id}`}
    />
  );

  const getActionCtaView = (cardId) => (
    <div className={styles.actionCard.actionItemWrapper}>
      {actionCard[cardId]?.actionItem.length === 0 ? (
        <Typography 
          variant={TYPOGRAPHY_VARIANT.H7}
          className={styles.actionCard.placeHolderText}
        >
          {MID_AREA_STATICS.ACTION_CARD.placeHolderText}
        </Typography>
        ) : (
          actionCard[cardId]?.actionItem?.map(getActionItem)
        )}
    </div>
  )

  
  const getActionCard = ( cardId, index ) => (
    <Droppable 
      key={index}
      droppableId={cardId}
    >
      {(provided) => (
        <Card 
          ref={provided.innerRef}
          {...provided.droppableProps}
          key={cardId}
          variant={CARD_VARIANT.OUTLINED}
          className={styles.actionCard.container}
        >
          {getCardHeaderView(index, cardId)}
          <Divider/>
          {getActionCtaView(cardId)}
          {provided.placeholder}
        </Card>
      )}
    </Droppable>
  );

  const getActionCardListView = () => (
    <div className={styles.actionCardListWrapper}>
      {actionCardIds?.map(getActionCard)}
    </div>
  )
  

  return (
    <div className={classNames(styles.container, className)}>
      {getHeaderView()}
      {getActionCardListView()}
    </div>
  )
}

export { MidArea };