import React, { useState } from "react";
import "./App.css";
export default function App(){
 const [word,setWord]=useState("");
 const [result,setResult]=useState(null);
 const [error,setError]=useState("");
 const searchWord=async()=>{
  if(!word) return;
  try{
   const r=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
   const d=await r.json();
   if(d.title){setError('Word not found');setResult(null);} else {setResult(d[0]);setError('');}
  }catch(e){setError('Something went wrong');}
 };
 return <div className='container'>
 <h1>📖 Dictionary App</h1>
 <div className='search-box'>
 <input value={word} onChange={e=>setWord(e.target.value)} placeholder='Enter a word...' />
 <button onClick={searchWord}>Search</button>
 </div>
 {error && <p className='error'>{error}</p>}
 {result && <div className='card'><h2>{result.word}</h2><p><b>Phonetic:</b> {result.phonetic}</p>{result.meanings.map((m,i)=><div key={i}><h3>{m.partOfSpeech}</h3><p>{m.definitions[0]?.definition}</p></div>)}</div>}
 </div>
}