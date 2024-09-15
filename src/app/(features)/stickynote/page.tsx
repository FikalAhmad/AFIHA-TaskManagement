"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import AddStickyNote from "./AddStickyNote";
import { useFetchingSN } from "@/app/api/stickynote/useFetchingSN";
import { SNScheme } from "@/app/types/datatype-SN";

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

  const {
    data: SNData,
    isLoading: loadingSNData,
    isError,
    error: apiError,
  } = useFetchingSN();

  console.log(SNData?.result?.data);

  useEffect(() => {
    if (SNData?.result?.data) {
      // Map the SNData to create positions
      const updatedPositions = SNData.result.data.map(() =>
        getRandomPosition(800, 600)
      );
      setPositions(updatedPositions);
    }
  }, [SNData]);

  const handleDrag =
    (index: number) => (e: DraggableEvent, ui: DraggableData) => {
      // Update position of the dragged item
      const newPositions = [...positions];
      newPositions[index] = { x: ui.x, y: ui.y };
      setPositions(newPositions);
    };

  console.log(positions);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <AddStickyNote />
      {SNData?.result?.data && positions.length !== 0 ? (
        SNData.result.data.map((item: SNScheme, index: number) => (
          <Draggable
            key={item.id}
            bounds="parent"
            position={positions[index]}
            onDrag={handleDrag(index)}
            nodeRef={draggableRef}
          >
            <div
              style={{ backgroundColor: item.color }}
              className="w-48 h-48 p-3 cursor-grabbing absolute group"
              ref={draggableRef}
            >
              <h1>{item.title}</h1>
              <div className="text-xs">{item.content}</div>
              <div className="flex flex-col items-end relative">
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  className="invisible absolute -top-16 -right-7 rounded-3xl group-hover:visible"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
          </Draggable>
        ))
      ) : (
        <div className="flex justify-center items-center h-[90vh]">
          no stickynotes added yet!
        </div>
      )}
    </div>
  );
};

export default StickyNote;
