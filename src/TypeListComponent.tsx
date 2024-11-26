import React from "react";
import { useDrag } from "react-dnd";

const ItemType = {
  INPUT: "input",
  DROPDOWN: "dropdown",
};

interface DraggableItem {
  id: number;
  type: string;
  label: string;
  dataOptions?: string[] | undefined;
}

const TypeListComponent: React.FC = () => {
  const draggableItems: DraggableItem[] = [
    { id: 1, type: ItemType.INPUT, label: "Input Box" },
    { id: 2, type: ItemType.DROPDOWN, label: "Dropdown Selector", dataOptions: ["Option 1", "Option 2", "Option 3"] },
  ];
  

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc" }}>
      <h3>Drag Items</h3>
      {draggableItems.map((item) => {
        const [, drag] = useDrag(() => ({
          type: item.type,
          item: { type: item.type, id: item.id },
          dataOptions: item.dataOptions,
          options: { dropEffect: "copy" },
        }));

        return (
          <div
            key={item.id}
            ref={drag}
            style={{
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default TypeListComponent;
