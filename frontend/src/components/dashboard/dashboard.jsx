import styles from "./Dashboard.module.css";
import NewProject from "../newProject/newProject";
import ProjectCard from "../projectCard/projectCard";

const Dashboard = ({ projects = []}) => {
  
  return (
    <div className={styles.wrap}>
      <main className={styles.main}>
        <section className={styles.heroWrap}>
          <NewProject />
        </section>

        <section className={styles.historyWrap}>
          <div className={styles.historyGrid}>
            {projects.map((p) => (
              <ProjectCard key={p.id} p={p}/>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
