import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Root } from '../pages/Root/Root';
import { Knowledge } from '../pages/Knowledge/Knowledge';
import { Team } from '../pages/Team/Team';
import { Shop } from '../pages/Shop/Shop';
import { Greetings } from '../pages/Greetings/Greetings.tsx';
import { Register } from '../pages/Register/Register.tsx';
import { Login } from '../pages/Login/Login.tsx';
import { Article } from '../pages/Article/Article';
import { Account } from '../pages/Account/Account.tsx';
import { Video } from '../pages/Video/Video';
import { MissionPage } from '../pages/MissionPage/MissionPage.tsx';
import { PopupMission } from '../components/Mission/PopupMission/PopupMission.tsx';
import { TaskContainer } from '../pages/TaskContainer/TaskContainer.tsx';
import { Audio } from '../pages/Audio/Audio.tsx';
import { RegisterAdmin } from '../pages/RegisterAdmin/RegisterAdmin.tsx';
import { Questions } from '../pages/Questions/Questions.tsx';
import { Question } from '../pages/Question/Question.tsx';
import { PagesNotFound } from '../pages/PageNotFound/PageNotFound.tsx';
import { Favourites } from '../pages/Favourites/Favourites.tsx';
import { getArticle, getQuestion } from '../API/knowledge-base/index.ts';
import { getPersonalData } from '../API/personal-account/index.ts';
import { MissionAdmin } from '../components/Mission/MissionAdmin/MissionAdmin.tsx';

interface ParamsA {
  articleId: number;
}
interface ParamsQ {
  questionId: number;
}

const checkAuth = async () => {
  return getPersonalData()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

function routes() {
  return [
    { path: '/greeting', element: <Greetings /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/company-register', element: <RegisterAdmin /> },
    { path: '*', element: <Navigate to='/greeting' replace /> },
  ];
}

function privateRoutes() {
  return {
    element: <Root />,
    errorElement: <PagesNotFound />,
    children: [
      {
        path: '/',
        element: <Knowledge />,
      },
      {
        path: 'knowledge/article/:articleId',
        element: <Article />,
        loader: async ({ params }) => {
          const typedParams = params as unknown as ParamsA;
          if (!typedParams.articleId) {
            return null;
          }
          const article = await getArticle(typedParams.articleId);
          return {
            articleId: article.articleId,
            theme: article.theme,
            information: article.information,
            imagePath: article.imagePath,
          };
        },
      },
      {
        path: 'knowledge/question/:questionId',
        element: <Question />,
        loader: async ({ params }) => {
          const typedParams = params as unknown as ParamsQ;
          if (!typedParams.questionId) {
            return null;
          }
          const question = await getQuestion(typedParams.questionId);
          return {
            questionId: question.questionId,
            theme: question.theme,
            answer: question.answer,
            imagePath: question.imagePath,
          };
        },
      },

      {
        path: 'team',
        element: <Team />,
      },
      {
        path: 'tasks/:articleId',
        element: <PopupMission />,
      },
      {
        path: 'mission',
        element: <MissionPage />,
      },
      {
        path: 'mission/:articleId',
        element: <MissionAdmin />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },

      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'video',
        element: <Video />,
      },
      {
        path: 'audio',
        element: <Audio />,
      },
      {
        path: 'questions',
        element: <Questions />,
      },
      {
        path: 'favourites',
        element: <Favourites />,
      },
      {
        path: '/login',
        element: <Navigate to='/' replace />,
      },
      {
        path: '/register',
        element: <Navigate to='/' replace />,
      },
      {
        path: '/greeting',
        element: <Navigate to='/' replace />,
      },
      {
        path: '/company-register',
        element: <Navigate to='/' replace />,
      },
    ],
  };
}

export const router = createBrowserRouter([
  (await checkAuth()) ? privateRoutes() : {},
  ...routes(),
]);
