import React, { useState } from "react";
import { useDrop } from "react-dnd";

const ItemType = {
    INPUT: "input",
    DROPDOWN: "dropdown",
};

interface FormElement {
    id: number;
    type: string;
    required?: boolean;
}

const FormBuilderComponent: React.FC = () => {
    const [formElements, setFormElements] = useState<FormElement[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<number | null>(null);

    const [, drop] = useDrop(() => ({
        accept: [ItemType.INPUT, ItemType.DROPDOWN],
        drop: (item: FormElement) => {
            // Add a cloned element to the form
            setFormElements((prev) => [
                ...prev,
                { id: new Date().getTime(), type: item.type },
            ]);
        },
    }));

    const addRequiredField = (elementId: number, required: boolean) => {
        const newVal = formElements?.map((element) => {
            return element?.id === elementId ? { ...element, required: required } : element
        })
        setFormElements(newVal)
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>

            <div
                ref={drop}
                style={{
                    minHeight: "300px",
                    padding: "1rem",
                    border: "2px dashed #aaa",
                }}
            >
                <h3>Drop Here to Build Form</h3>
                {formElements.map((element, index) => (
                    <div
                        key={element.id}
                        style={{
                            margin: "0.5rem 0",
                            padding: "0.5rem",
                            border: "1px solid #ddd",
                        }}
                    >
                        {element.type === ItemType.INPUT && <input type="text" placeholder="Input Box" onFocus={() => setSelectedElementId(element.id)} />}
                        {element.type === ItemType.DROPDOWN && (
                            <select onFocus={() => setSelectedElementId(element.id)}>
                                <option value="">Select</option>
                            </select>
                        )}
                    </div>
                ))}
                <button onClick={() => console.log("Saving form...", formElements)}>save</button>
            </div>
            <div>
                {formElements.map((element) => (
                    <div key={element.id}>
                        {element.id === selectedElementId &&
                            <div key={element.id} >
                                <h6>{element.type} {element.id}</h6>
                                <button onClick={() => addRequiredField(element.id, true)}>required</button>
                                <button onClick={() => addRequiredField(element.id, false)}>not required</button>
                            </div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormBuilderComponent;
