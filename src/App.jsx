import { useState, useCallback,useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += ".,><?/;:')+*&%$#@!=^";

    for(let i = 1; i <= length; i++) {
      let ind = Math.floor(Math.random() * str.length + 1);
      pass += str[ind];
    }

    setPassword(pass);

  },[length,numberAllowed,charAllowed])

  useEffect(() => {
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  // useRef Hook
  const passwordRef = useRef(null);

  const copyToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      <div className="bg-gray-700 max-w-lg rounded-md mx-auto px-4 py-4 my-8 w-full">
        <h1 className="text-3xl text-center text-white px-4 py-4">
          Password Generator
        </h1>
        <div className="flex overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="w-full outline-none rounded-sm px-2 py-1"
            ref={passwordRef}
            readOnly
          />
          <button className="bg-blue-600 outline-none rounded-sm px-4 py-2 text-white cursor-pointer hover:bg-blue-900" onClick={copyToClipboard}>
            Copy
          </button>
        </div>

        <div>
          <div className="flex justify-center gap-x-3 text-sm font-semibold text-orange-600 py-3">
            <input 
             type="range" 
             min={4}
             max={20}
             value={length}
             onChange={(e)=> {setLength(e.target.value)}}
             className="cursor-pointer"
            />
            <label htmlFor="range">Length : {length}</label>

            <input 
             type="checkbox" 
             defaultChecked={numberAllowed}
             onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
             className="cursor-pointer"
            />
            <label>Number</label>

            <input 
             type="checkbox" 
             defaultChecked={charAllowed}
             className="cursor-pointer"
             onChange={() => {
               setCharAllowed((prev) => !prev);
             }}
            />
            <label>Special Character</label>
          </div>
        </div>
      </div>

      <div className="w-full text-center text-white font-bold">
        Made with ❤ by <a href="https://www.github.com/arnab18maity" target="_blank" className="underline">Arnab</a>
      </div>
    </>
  );
}

export default App;
