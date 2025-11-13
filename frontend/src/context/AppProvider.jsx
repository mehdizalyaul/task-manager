import ThemeProvider from "./ThemeContext";
import NotificationProvider from "./NotificationContext";
import AuthProvider from "./AuthContext";
import ProjectProvider from "./ProjectContext";
import SearchProvider from "./SearchContext";
import { LoadingProvider } from "./LoadingContext";
import TaskProvider from "./TaskContext";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <LoadingProvider>
        <NotificationProvider>
          <ThemeProvider>
            <ProjectProvider>
              <SearchProvider>
                <TaskProvider>{children}</TaskProvider>
              </SearchProvider>
            </ProjectProvider>
          </ThemeProvider>
        </NotificationProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}
