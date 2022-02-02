import { Dispatch } from 'redux';
import { workflowActions } from '../slices/workflow-slice';
import { ACTIVE_FLOW } from '../constants/app/keys-constants';
import { clearNews } from './news-thunks';
import { clearAchievement } from './achievement-thunks';
import { clearActivity } from './activity-thunks';
import { clearDocument } from './document-thunks';
import { clearFaq } from './faq-thunks';
import { clearFeedback } from './feedback-thunks';
import { clearMedialib } from './medialib-thunks';
import { clearOrganization } from './organization-thunks';
import { clearPost } from './post-thunks';
import { clearPostCategory } from './post-category-thunks';
import { clearPortfolio } from './portfolio-thunks';
import { clearProjects } from './project-thunks';
import { clearService } from './service-thunks';
import { clearStaff } from './staff-thunks';
import { clearSubdivision } from './subdivision-thunks';
import { clearSuperuser } from './superuser-thunks';
import { clearVacancy } from './vacancy-thunks';

const { setFlow, setProject } = workflowActions;

export const updateFlow =
  (code: string | null) => async (dispatch: Dispatch<any>) => {
    if (code) {
      localStorage.setItem(ACTIVE_FLOW, code);
    } else {
      localStorage.removeItem(ACTIVE_FLOW);
    }

    dispatch(setFlow(code));
    dispatch(clearWorkflow());
  };

export const updateProjects =
  (projects: any[] | null) => async (dispatch: Dispatch<any>) => {
    dispatch(setProject(projects));
  };

export const clearWorkflow = () => async (dispatch: Dispatch<any>) => {
  dispatch(clearNews());
  dispatch(clearAchievement());
  dispatch(clearActivity());
  dispatch(clearDocument());
  dispatch(clearFaq());
  dispatch(clearFeedback());
  dispatch(clearMedialib());
  dispatch(clearOrganization());
  dispatch(clearPost());
  dispatch(clearPostCategory());
  dispatch(clearPortfolio());
  dispatch(clearProjects());
  dispatch(clearService());
  dispatch(clearStaff());
  dispatch(clearSubdivision());
  dispatch(clearSuperuser());
  dispatch(clearVacancy());
};
