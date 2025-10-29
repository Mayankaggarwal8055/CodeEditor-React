import React, { useState, useMemo, useEffect } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import ReactSrcDocIframe from "react-srcdoc-iframe";
import styles from "./CodeEditor.module.css";
import { useLocation, useParams } from "react-router-dom";
import LoginRequiredModal from "../../components/common/LoginRequiredModal";
import userProjectData from "../../API/projectData";

const API_BASE = "http://localhost:4444";

const CodeEditor = ({ D }) => {
  const { id } = useParams();
  const { state } = useLocation();
  const projectData = state?.project;

  const [Html, setHtml] = useState("");
  const [Css, setCss] = useState("");
  const [Js, setJs] = useState("");
  const [output, setoutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    if (!projectData) return;
    setHtml(projectData.html || "");
    setCss(projectData.css || "");
    setJs(projectData.js || "");
  }, [projectData?.id]); 

  useEffect(() => {
    if (!id || projectData) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/projects/${id}`, { credentials: "include" });
        if (!res.ok) throw new Error(`Failed to load project ${id}`);
        const data = await res.json();
        const p = data.data || data;
        if (!mounted) return;
        setHtml(p.html || "");
        setCss(p.css || "");
        setJs(p.js || "");
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id, projectData]);

  const Htmlcode = useMemo(() => {

    const isLikelyBroken = /<[^>]*$/m.test((Html || "").trim());

    const consoleScript = isLikelyBroken
      ? "" 
      : ` <script>
              (function(){
                const o = { log: console.log.bind(console), warn: console.warn.bind(console), error: console.error.bind(console) };
                function post(type, a){ parent.postMessage({__console:type, args:a.map(x=>{try{return typeof x==='object'?JSON.stringify(x):String(x)}catch(e){return String(x)}})}, '*'); }
                console.log = (...a)=>{ post('log', a); o.log(...a); };
                console.warn = (...a)=>{ post('warn', a); o.warn(...a); };
                console.error = (...a)=>{ post('error', a); o.error(...a); };
                try { ${Js || ""} } catch(e){ console.error(e); }
              })();
            <\/script>`;

              return `<!DOCTYPE html>
                      <html lang="en">
                      <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Code Preview</title>
                        <style>${Css || ""}</style>
                      </head>
                      <body>
                        ${Html || ""}
                        ${consoleScript}
                      </body>
                      </html>`;
  }, [Html, Css, Js]);

  const clearcode = () => {
    setHtml("");
    setCss("");
    setJs("");
    setoutput("");
  };

  const consoleCode = () => {
    const originallog = console.log;
    const originalerror = console.error;
    const originalwarn = console.warn;
    setoutput("");
    try {
      console.log = (...args) => { setoutput((p) => p + args.join(" ") + "\n"); originallog.apply(console, args); };
      console.error = (...args) => { setoutput((p) => p + args.join(" ") + "\n"); originalerror.apply(console, args); };
      console.warn = (...args) => { setoutput((p) => p + args.join(" ") + "\n"); originalwarn.apply(console, args); };
      
      if (Js && Js.trim()) eval(Js);
    } catch (error) {
      console.log(error);
    } finally {
      console.log = originallog;
      console.error = originalerror;
      console.warn = originalwarn;
    }
  };

  const saveData = async () => {
    const isLoggedIn = Boolean(D && D.email);
    if (!isLoggedIn) {
      setLoginModal(true);
      return;
    }

    const payload = { html: Html, css: Css, js: Js };

    try {
      const result = await userProjectData(payload); 
      if (result?.error) throw new Error(result.error);
      alert("Project saved successfully!"); 
    } catch (e) {
      alert(e.message || "Save failed");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <h1 className={styles.heading}>CodeEditor in React</h1>
        <div className={styles.btnRow}>
          <button onClick={clearcode} className={styles.btn}>Clear</button>
          <button onClick={consoleCode} className={styles.btn}>Run</button>
          <button onClick={saveData} className={styles.btn}>Save</button>
        </div>
      </div>

      {loading && <div className={styles.loading}>Loading project…</div>}

      <div className={styles.editors}>
        <ReactCodeMirror
          placeholder={"<--HTML Code-->"}
          value={Html}
          height="250px"
          theme={dracula}
          extensions={[html()]}
          onChange={(value) => setHtml(value)}
          className={styles.cm}
        />
        <ReactCodeMirror
          placeholder={"<--Css Code-->"}
          value={Css}
          height="250px"
          theme={dracula}
          extensions={[css()]}
          onChange={(value) => setCss(value)}
          className={styles.cm}
        />
        <ReactCodeMirror
          placeholder={"<--Js Code-->"}
          value={Js}
          height="250px"
          theme={dracula}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setJs(value)}
          className={styles.cm}
        />
      </div>

      <div className={styles.outputRow}>
        <div className={styles.previewBox}>
          <ReactSrcDocIframe
            srcDoc={Htmlcode}
            className={styles.preview}
            height="340px"
            width="700px"
          />
        </div>
        <pre className={styles.console} id="ConsoleBox">
          {output}
        </pre>
      </div>

      <LoginRequiredModal open={loginModal} onClose={() => setLoginModal(false)} />
    </div>
  );
};

export default CodeEditor;
