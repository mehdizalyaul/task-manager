import TaskProvider from "./TaskContext";
import ThemeProvider from "./ThemeContext";
import NotificationProvider from "./NotificationContext";
import AuthProvider from "./AuthContext";
import ProjectProvider from "./ProjectContext";
import { SearchProvider } from "./SearchContext";
export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <ProjectProvider>
            <SearchProvider>
              <TaskProvider>{children}</TaskProvider>
            </SearchProvider>
          </ProjectProvider>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
