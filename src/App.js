import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { MidArea } from "./components/MidArea/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";

const styles = {
  container: 'mit__scratch__task__mid-area__container',
  // sideba
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

const App = () => {
  const [actionCard, setActionCard] = useState({});
  const [actionCardIds, setActionCardIds] = useState([])
  const [sidebarActionCtaList, setSidebarActionCtaList] = useState([]);
  
  // set the sprite to initial position.

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

    const actionCtaItem = actionCtaList[source.droppableId];
    // update the card action list item.
    // setActionItem((prevState) => ([
    //   ...prevState,
    //   [destination.droppableId]: {
    //     ...prevState[destination.droppableId],
    //     actionItem: [
    //       ...prevState[destination.droppableId].actionItem,
    //       actionCtaItem,
    //     ]
    //   }
    // ]))
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
              // className}
            />
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export { App };
