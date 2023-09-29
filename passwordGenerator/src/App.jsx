import { useEffect, useState,useRef, useCallback } from "react";
// import Card from "./Card";
// import Button from "./Button";

function App() {
  let refrence = useRef(null)
  let [length, setLength] = useState(10);
  const [digitAllowed , setDigitAllowed] = useState(false)
  const [symbolAllowed , setSymbolAllowed] = useState(false)
  const [password , setPassword] = useState('')
  let   [display ,setDisplay] =useState(false)
  // console.log('hey')
  
  let letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // console.log(letter)
  let Digits = '1234567890'
  // console.log(Digits)
  let symbols = '~!@#$%^&*()_+{}:><?`,./;-='
  // console.log(symbols)

  let see=()=>{
    setDisplay(true)
   setInterval(()=>{
      setDisplay(false)
    },1000)
  }

 const handleCopy = useCallback(() =>{
  refrence.current?.select();
 window.navigator.clipboard.writeText(password)
  see()
 
 },[password])


const handlePasswordGeneration = () => {
    let randomPassword = '';
    if (digitAllowed) {
      letter += Digits;
    }
    if (symbolAllowed) {
      letter += symbols;
    }
    for (let i = 1; i <= length; i++) {
      let rNumber = Math.floor((Math.random() * letter.length));
      randomPassword += letter[rNumber];
    }
    setPassword(randomPassword);
  }

  // useCallback isn't necessary for handlePasswordGeneration

  useEffect(() => {
    handlePasswordGeneration();
  }, [digitAllowed, symbolAllowed, length]);


  return (
    <main>
    {display && (<div className="p-3 text-center bg-slate-900 text-white notification">
      <p>Text copied</p>
    </div>)}
    
      <div className="w-full mt-14  p-2 pb-10 rounded max-w-[500px] mx-auto bg-slate-700 ">
      <h1 className="text-center text-white font-mono text-l mb-2">Password Generator</h1>
        <header className="flex">
          <input
            className=" rounded-md outline-0 mx-1 pl-2 pt-0 p-1 w-full"
            type="text"
            placeholder="password"
            readOnly={true}
            value={password}
            ref={refrence}
          />
          <button onClick={handleCopy} className="px-2 rounded-md  hover:bg-slate-800 hover:text-white bg-slate-300 font-mono text-sm">
            Copy
          </button>
        </header>

        <button onClick={handlePasswordGeneration} className=" w-full h-9 mt-2 px-2 rounded-md m-auto hover:bg-slate-800 hover:text-white bg-slate-300 font-mono text-sm">
          Generate
        </button>
        <div className="flex items-center bg-white p-1 rounded-md   justify-center  mt-2">
          <input
            type="range"
            className="w-full "
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <span>:</span>
          <span className="mx-2 bg-slate-300 w-7 flex justify-center align-middle rounded-full">
            {length}
          </span>
        </div>

        <div className=" flex justify-evenly button border-2 mt-3 p-2 rounded">
          <div className=" flex  justify place-content-center flex-col text-center">
            <input checked={digitAllowed} onChange={e=>setDigitAllowed(!digitAllowed)} className=" mb-0" id="textAllowed" type="Checkbox" />
            <br />
            <label className="text-xs text-white  " htmlFor="textAllowed">
              Digits allowed
            </label>
          </div>
          <div className=" flex  justify place-content-center flex-col text-center">
            <input checked={symbolAllowed}  onChange={e=>setSymbolAllowed(!symbolAllowed)} id="symbolAllowed" type="Checkbox" />
            <br />
            <label  className=" text-xs text-white" htmlFor="symbolAllowed">
              Symbol Allowed
            </label>
            
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
