import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewProject.module.css";

const NewProject = () => {
  const navigate = useNavigate();

  const editorHandler = () => {
    navigate("/editor");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.card} role="button" tabIndex={0} onClick={editorHandler} onKeyDown={(e) => (e.key === "Enter" ? editorHandler() : null)}>
        <div className={styles.plusBadge}>+</div>
        <div className={styles.content}>
          <h2 className={styles.heading}>New Project</h2>
          <p className={styles.sub}>
            Start a fresh HTML, CSS, JS sandbox in the editor.
          </p>
          <button className={styles.cta}>Create & Open</button>
        </div>
        <div className={styles.glow} />
      </div>
    </section>
  );
};

export default NewProject;
