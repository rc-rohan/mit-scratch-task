import React, { createRef, useEffect, useRef, useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { MidArea } from "./components/MidArea/MidArea";
import { PreviewArea } from "./components/PreviewArea/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { ACTION_CTA_LIST } from "./statics/GlobalStatics";
import { ACTION_TYPE } from "./statics/CommonEnums";

const styles = {
  container: 'mit__scratch__task__mid-area__container',
}

const SPRITE_WRAPPER_ID = 'spriteWrapperId'

const App = () => {
  const [actionCard, setActionCard] = useState({});
  const [actionCardIds, setActionCardIds] = useState([])
  const [sidebarActionCtaList, setSidebarActionCtaList] = useState([]);
  const [message, setMessage] = useState('');

  const spriteRef = useRef(null);

  useEffect(() => {
    setSidebarActionCtaList(ACTION_CTA_LIST)
  },[]);

  const handleDragEnd = (result) =>{
    const {source, destination} = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId 
      && destination.index === source.index) {
      return;
    }
    
    const actionCtaItem = sidebarActionCtaList[source.index];
    setActionCard((prevState) => ({
      ...prevState,
      [destination.droppableId]: {
        ...prevState[destination.droppableId],
        actionItem: [
          ...prevState[destination.droppableId].actionItem,
          actionCtaItem,
        ]
      }
    }))
  }

  const handleActionCardPlayCta = (actionItems) => {
    let scale = 1;
    let x = 0;
    let y = 0;
    let rotate = 0;
    let count = 0;

    if (spriteRef.current && (x != 0 || y !=0 || rotate != 0 || message.length != 0) ) {
      setTimeout(() => {
        setMessage('');
        spriteRef.current.style.transform = `scale(${scale}) translate(${0}%, ${0}%) rotate(${0}deg)`;
      }, 1000);
    }

    actionItems.forEach((item, index) => {
      setTimeout(() => {
        switch (item.id) {
          case ACTION_TYPE.TRNASLATE_X:
            x += item.action;
            break;
          case ACTION_TYPE.TRNASLATE_Y: 
            y += item.action;
            break;
            case ACTION_TYPE.TRNASLATE_XY: 
            y += item.action;
            x += item.action;
            break;
          case ACTION_TYPE.ROTATE: 
            rotate += item.action;
            break;
          case ACTION_TYPE.MESSAGE: 
            setMessage(item.action);
            break;
          default:
            x = 0;
            y = 0;
            break;
        }

        if (spriteRef.current) {
          spriteRef.current.style.transform = `scale(${scale}) translate(${x}%, ${y}%) rotate(${rotate}deg)`;
        }
      }, index * 1000); 
    })
  }

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="h-screen overflow-hidden flex flex-row  ">
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar />
            <MidArea 
              actionCard={actionCard}
              actionCardIds={actionCardIds}
              setActionCardIds={setActionCardIds}
              setActionCard={setActionCard}
              onPlayActionCard={handleActionCardPlayCta}
            />
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea 
              ref={spriteRef}
              spriteId={SPRITE_WRAPPER_ID}
              message={message}
            />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export { App };
