"use client";
import { useState, useEffect, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface Position {
  x: number;
  y: number;
}

const getRandomPosition = (maxWidth: number, maxHeight: number) => {
  const randomX = Math.floor(Math.random() * (maxWidth - 100));
  const randomY = Math.floor(Math.random() * (maxHeight - 100));
  return { x: randomX, y: randomY };
};

const StickyNote = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const draggableRef = useRef(null);

  useEffect(() => {
    // Initial positions setup
    const initialPositions = Array.from({ length: 5 }, () =>
      getRandomPosition(800, 600)
    );
    setPositions(initialPositions);
  }, []);

  const handleDrag =
    (index: number) => (e: DraggableEvent, ui: DraggableData) => {
      // Update position of the dragged item
      const newPositions = [...positions];
      newPositions[index] = { x: ui.x, y: ui.y };
      setPositions(newPositions);
    };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {positions.map((position, index) => (
        <Draggable
          key={index}
          bounds="parent"
          position={position}
          onDrag={handleDrag(index)}
          nodeRef={draggableRef}
        >
          <div
            className="w-48 h-48 bg-blue-300 p-3 cursor-grabbing absolute"
            ref={draggableRef}
          >
            <h1>Thesis Report</h1>
            <div className="text-xs">
              Lorem Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit Amet
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default StickyNote;
