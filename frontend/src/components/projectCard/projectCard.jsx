import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ p }) => {
    
    const navigate = useNavigate();

    const srcDoc = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html, body { margin:0; padding:0; overflow:hidden !important; }
    /* Tweak scale and centering so big headings look balanced */
    body { transform: scale(0.75); transform-origin: top center; }
    /* Provide a neutral backdrop so dark text is visible */
    body { background:#0e1418; color:#e6eef0; }
  </style>
  <style>${p.css || ""}</style>
</head>
<body>
${p.html || ""}
<script>${p.js || ""}<\/script>
</body>
</html>`.trim();


    const open = () => navigate(`/editor/${p.id}`, { state: { project: p } });
    const dateText = p.createdAt ? new Date(p.createdAt).toLocaleString() : "";

    return (
        <article
            className={styles.card}
            onClick={open}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? open() : null)}
        >
            <div className={styles.thumb}>
                <iframe
                    className={styles.thumbFrame}
                    title={p.id}
                    sandbox="allow-scripts allow-same-origin"
                    srcDoc={srcDoc}
                />
                <div className={styles.badge}>PROJECT</div>
            </div>

            <div className={styles.meta}>
                <div className={styles.footer}>
                    <span className={styles.date}>{dateText}</span>
                </div>
            </div>

            <div className={styles.glow} />
        </article>
    );
};

export default ProjectCard;
