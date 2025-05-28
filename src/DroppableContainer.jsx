import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function DroppableContainer(props) {
  const { setNodeRef, isOver } = useDroppable({ id: props.id });
  const classes = `${isOver ? "over" : ""} droppable`;
  const style = props.gameOver ? { width: "5px" } : { border: "none" };
  return (
    <div ref={setNodeRef} className={classes} style={style}>
      {props.children}
    </div>
  );
}