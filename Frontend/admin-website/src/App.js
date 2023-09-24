import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "./scenes/dashboard";
import Global from "./scenes/global/global";
import Login from "./scenes/login"
import Exam from "./scenes/exam";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import NewExam from "./scenes/newexam/NewExam";
import ExistingExam from "./scenes/existingexam/ExistingExam";
import ViewQuestion from "./scenes/viewquestions/ViewQuestion"
import PastExams from "./scenes/pastexams/PastExams";
import PublishResults from "./scenes/publishresults/PublishResults";
import Home from "./scenes/Home/Home"
import Register from "./scenes/register/Register" 
import ForgotPass from "./scenes/forgotpassword/ForgotPass";
import EditProfile from "./scenes/editprofile/EditProfile";
import PastExamTable from "./scenes/pastexams/PastExamTable";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: "/login", element: <Login />
  },
  {
    path: "/register", element: <Register />,
  },
  {
    path: "/forgotpassword", element: <ForgotPass />,
  },
  {
    path: 'global', element: <Global />,
    children: [
      {
        index: true, element: <Dashboard />
      },
      {
        path: "exam", element: <Exam />
      },
      {
        path: "new_exam", element: <NewExam />,
      },
      {
        path: "existing_exam", element: <ExistingExam />
      },
      {
        path: "view_questions", element: <ViewQuestion />
      },
      {
        path: "past_exams", element: <PastExams />
      },
      {
        path: "publish_results", element: <PublishResults />
      },
      {
        path: "edit_profile", element: <EditProfile />
      },
    ]
  }])

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
