import {FunctionFragment} from '@ethersproject/abi';
import { Button,TextField, Collapse, List, ListItem} from '@material-ui/core';
import React, { useState } from 'react';


interface FunctionProps {
    fragment: FunctionFragment;
    onExecute: (inputValues: any[]) => void; // Define the execution function
}

export function ContractExecution({fragment,onExecute}: FunctionProps) {
    const [inputValues, setInputValues] = useState<string[]>(new Array(fragment.inputs.length).fill(''));
    const [expanded, setExpanded] = useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
      };    

    const handleInputChange = (index: number, value: string) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
      };
    
    const handleExecute = () => {
        // Convert input values to the appropriate types based on ParamType
        const parsedInputValues = inputValues.map((value, index) => {
          const inputType = fragment.inputs[index].type;
          // Perform conversion based on inputType (you might need to implement this)
          return value; // Placeholder, you need to convert value based on inputType
        });
    
        onExecute(parsedInputValues);
      };

    return (
        <div className="border p-4 mb-4 text-neutral-900">
        <div
          className="cursor-pointer flex justify-between items-center"
          onClick={handleExpandClick}
        >
          <span>{fragment.name}</span>
          {expanded ? '▲' : '▼'}
        </div>
        <Collapse in={expanded}>
          <div className="space-x-2 mt-2 text-neutral-900">
            {fragment.inputs.map((input, index) => (
              <TextField
                key={index}
                label={`${input.name}: ${input.type}`}
                variant="outlined"
                size="small"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
            <Button variant="contained" onClick={handleExecute}>
              Execute
            </Button>
          </div>
        </Collapse>
      </div>
    )




}