import { Button } from "../components";
import "../styles/NoProjects.css";

export default function NoProjects({ openModal, isProjectExist }) {
  return (
    <div className="no-project_container">
      <div>
        <p className="no-project_text" style={{ marginBottom: "25px" }}>
          {isProjectExist ? "Create a project" : "Create your first project"}
        </p>
      </div>

      <Button
        title="Create a Project"
        onClickButton={openModal}
        fullWidth={false}
        alignLeft={false}
      />
    </div>
  );
}
