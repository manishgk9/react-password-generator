import { useState,useCallback, useEffect ,useRef} from 'react'
function App() {
  const [length, setLength] = useState(8);
  const [numallowed, setNumallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [password,setPassword]=useState("");
  // useRef hook
  const passRef=useRef();

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwqyz";
    if (numallowed) str+="0123456789";
    if(charallowed) str+="!@#$&&+=-*";
    for(let i=1;i<=length;i++){
      const char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);

    }
    setPassword(pass);
  },[length,numallowed,charallowed,setPassword]);
  const copypassword=useCallback(()=>{
    passRef.current.select();

    navigator.clipboard.writeText(password);
  },[password]);
  useEffect(()=>{passwordGenerator()},[length,numallowed,charallowed,setPassword])
  return (
    < >
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 bg-slate-700 py-3 my-8'>
        <h2 className='text-center text-white pb-1'>Password Generator</h2>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input ref={passRef} type="text" value={password} placeholder='password' readOnly className='outline-none w-full py-1 px-3'/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.1 shrink-0' onClick={copypassword}>copy</button>
        </div>
        <div className='text-sm flex gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input type="range"value={length} min={6} max={16}  className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)}
            />
            <label className='text-orange-400'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numallowed}
            id="numberInput"
            onChange={()=>{setNumallowed((prev)=>!prev);}}
            />
            <label htmlFor="numberInput" className='text-orange-400'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1 text-red'>
            <input type="checkbox" 
            defaultChecked={charallowed}
            id="charInput"
            onChange={()=>{setCharallowed((prev)=>!prev);}}
            />
            <label htmlFor="charInput" className='text-orange-400'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
