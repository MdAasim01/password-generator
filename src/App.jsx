import { useCallback, useEffect, useRef, useState } from 'react'
import './scss/styles.scss'
import './App.css'

function App() {
  const [length, setLength] = useState(16)
  const [isNumAllow, setIsNumAllow] = useState(false);
  const [isCharAllow, setIsCharAllow] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumAllow) str += "0123456789";
    if(isCharAllow) str += "~`!@#$%^&*()_{}><?";

    for (let i = 1; i <= length; i++) {
      const char =  Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isNumAllow, isCharAllow, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 11);
    window.navigator.clipboard.writeText(password)
  }, [password]);

  
  useEffect(() => {
    passwordGenerator();
  }, [length, isNumAllow, isCharAllow, setPassword]);


  return (
    <>
      <section className="text-bg-secondary py-5" style={{height: '100vh'}}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card p-5 text-bg-dark shadow-lg">
                <div className="text-center mb-3">
                  <h2>Password Generator</h2>
                </div>
                <div className="input-group">
                  <input type="text" className="form-control"
                  value={password}
                  readOnly
                  ref={passwordRef}
                  />
                  <div className="input-group-text p-0">
                    <button className='btn btn-lg rounded-0' onClick={passwordGenerator}>
                      <i>&#8635;</i>
                    </button>
                    <button className="btn btn-lg btn-primary rounded-0"
                          onClick={copyPassword}
                    >Copy</button>
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <div className='d-flex me-4'>
                    <input type="range" min={8} max={50} id="length" className='me-2'
                          value={length} onChange={e => setLength(e.target.value)}
                      />
                    <label className="text-warning" htmlFor="length">Length({length})</label>
                  </div>
                  <div className='d-flex me-4'>
                    <input type="checkbox" id='numbers' className='form-check me-2'
                          defaultChecked={isNumAllow}  onChange={() => setIsNumAllow(prev => !prev)}
                    />
                    <label className="text-warning" htmlFor="numbers">Numbers</label>
                  </div>
                  <div className='d-flex me-4'>
                    <input type="checkbox" id='charachters' className='form-check me-2'
                          defaultChecked={isCharAllow}  onChange={() => setIsCharAllow(prev => !prev)}
                    />
                    <label className="text-warning" htmlFor="charachters">Special charachters</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


export default App
