import React, { useState } from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import ReactSrcDocIframe from 'react-srcdoc-iframe'
import { dracula } from '@uiw/codemirror-themes-all'

const App = () => {

  const [Html, setHtml] = useState()
  const [Css, setCss] = useState()
  const [Js, setJs] = useState()
  const [output, setoutput] = useState()

  const Htmlcode = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>${Css}</style>
                </head>
                <body
                    ${Html}
                    <script>${Js}</script>
                </body>
                </html>`

  localStorage.setItem('userdata', Htmlcode)


  const clearcode = () => {
    setHtml('')
    setCss('')
    setJs('')
  }

  const consoleCode = () => {

    const originallog = console.log
    const originalerror = console.error
    const originalwarn = console.warn

    setoutput('')

    console.log = (...args) => {
      setoutput(prev => prev + args.join(' ') + '\n')
      originallog.apply(console, args)
    }
    console.error = (...args) => {
      setoutput(prev => prev + args.join(' ') + '\n')
      originalerror.apply(console, args)
    }
    console.warn = (...args) => {
      setoutput(prev => prev + args.join(' ') + '\n')
      originalwarn.apply(console, args)
    }
    try {
      eval(Js)
    } catch (error) {
      console.log(error)
    }
    
    console.log = originallog;
    console.error = originalerror;
    console.warn = originalwarn;
  }

  return (

    <div>
      <div style={{ display: 'flex', justifyContent: "space-between" }}>
        <h1 style={{marginLeft:'20px'}}>CodeEditor in React</h1>
        <button onClick={clearcode} style={{ height: '20px', marginLeft: '1000px', marginTop: '24px' }}>Clear</button>
        <button onClick={consoleCode} style={{ height: '20px', marginRight: '50px', marginTop: '24px' }}>Run</button>
      </div>
      <div style={{ display: 'flex' }}>
        <ReactCodeMirror
          placeholder={'<--HTML Code-->'}
          value={Html}
          height="250px"
          width='460px'
          style={{ marginLeft: '20px' }}
          theme={dracula}
          extension={html()}
          onChange={(value) => {
            setHtml(value)
          }}
        />
        <ReactCodeMirror
          placeholder={'<--Css Code-->'}
          value={Css}
          height="250px"
          width='460px'
          style={{ marginLeft: '30px' }}
          theme={dracula}
          extension={css()}
          onChange={(value) => {
            setCss(value)
          }}
        />
        <ReactCodeMirror
          placeholder={'<--Js Code-->'}
          value={Js}
          height="250px"
          width='460px'
          style={{ marginLeft: '30px' }}
          theme={dracula}
          extension={[javascript({ jsx: true })]}
          onChange={(value) => {
            setJs(value)
          }}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <ReactSrcDocIframe srcDoc={Htmlcode} height='340px' width='700px' style={{ borderColor: 'black', margin: '20px' }} />
        </div>
        <pre style={{ height: '340px', width: '700px', backgroundColor: 'black',borderColor: 'black', margin: '20px' ,color:'white' }} id='ConsoleBox'>
          {output}
        </pre>
      </div>
    </div>
  )
}


export default App