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

// actionCard: {
//   cardId: {
//     id: cardId,
//     actionItem: [..cataData],
//   }
// }

// actionList = [
//   id: {
//     ...ctaData,
//   }
// ]

const SPRITE_WRAPPER_ID = 'spriteWrapperId'

const App = () => {
  const [actionCard, setActionCard] = useState({});
  const [actionCardIds, setActionCardIds] = useState([])
  const [sidebarActionCtaList, setSidebarActionCtaList] = useState([]);

  const spriteRef = useRef(null);

  useEffect(() => {
    setSidebarActionCtaList(ACTION_CTA_LIST)
  },[]);

  const handleDragEnd = (result) =>{
    console.log('result: ', result);
    const {source, destination} = result;
    console.log(source, destination)
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId 
      && destination.index === source.index) {
      return;
    }
    
    const actionCtaItem = sidebarActionCtaList[source.index];
    console.log('actionCtaItem: ', actionCtaItem)
    // update the card action list item.
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
    console.log('document.getelementById', document.getElementById(SPRITE_WRAPPER_ID))
    const el = document.getElementById(SPRITE_WRAPPER_ID);
    console.log(el.style); 
    
    let scale = 1;
    let x = -1;
    let y = -1;
    let rotate = 0;
    let count = 0;


    actionItems.map((item, index) => {
      console.log('insideForeach: ', item);
      switch (item.id) {
        case ACTION_TYPE.TRNASLATE_X:
          console.log('action X');
          x += actionItems.action;
          break;
        case ACTION_TYPE.TRNASLATE_Y: 
        console.log('action Y');
          y += actionItems.action;
        default:
          console.log('action default');
          x = 0;
          y = 0;
          break;
      }

          spriteRef.current.style.transform = `scale(${scale}) translate(${x}%, ${y}%) rotate(${rotate}deg)`;
          console.log('Updated styles:', spriteRef.current);


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
              spriteStyles={spriteStyles}
            />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export { App };
