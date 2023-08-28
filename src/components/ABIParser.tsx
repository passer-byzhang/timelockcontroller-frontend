import React, { useState ,ChangeEvent,useEffect} from 'react';
import { Button, TextareaAutosize,TextField } from '@mui/material';
import { Interface,JsonFragment,FunctionFragment} from '@ethersproject/abi';
import {ContractExecution} from './contract/Function';



async function ContractExecute(inputValues: any[]) {


}

function ContractFunctionParser() {
  const [abiInput, setAbiInput] = useState('');
  const [toContract,setToContract] = useState<string>();
  const [functions, setFunctions] = useState<FunctionFragment[]>([]);

  const handleAbiInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAbiInput(event.target.value);
    localStorage.setItem('abiInputValue', event.target.value);
  };

  useEffect(() => {
    const savedAbiInputValue = localStorage.getItem('abiInputValue');
    if (savedAbiInputValue) {
      // Restore the saved ABI input value
      setAbiInput(savedAbiInputValue);
    }
  }, []);

  const parseAbi = () => {
    try {
      const parsedAbi = JSON.parse(abiInput);
      const contractInterface = new Interface(parsedAbi);
      const parsedFunctions = contractInterface.fragments
        .filter(
            (fragment) => fragment.type === 'function' &&
            (fragment as FunctionFragment).stateMutability !== 'view' &&
            (fragment as FunctionFragment).stateMutability !== 'pure'
            
            )
        .map((fragment) => fragment as FunctionFragment);

      setFunctions(parsedFunctions);
    } catch (error) {
      console.error('Error parsing ABI:', error);
    }
  };

  return (

    <div>
      <div className="p-10 w-1/3">
      <TextField
        value={abiInput}
        onChange={handleAbiInputChange}
        className="w-100 h-100 resize-none border rounded p-20 resize-none text-neutral-900"
        placeholder="Paste your contract's ABI JSON here"
      />
      <Button variant="contained" onClick={parseAbi}>
        Parse ABI
      </Button>
      </div>

      <div>
        <h3 className="text-neutral-900">Callable Functions:</h3>
        <ul >
          {functions.map((func, index) => (
            <ContractExecution key={index} fragment={func} onExecute={ContractExecute}/>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContractFunctionParser;
