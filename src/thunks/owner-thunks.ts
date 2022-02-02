import { Dispatch } from 'redux';
import { ApiAuth } from '../http';
import { ownerActions } from '../slices/owner-slice';
import { authLogout } from './auth-thunks';
import { updateProjects } from './workflow-thunks';

const { setOwner, clearOwner } = ownerActions;

export const getOwner = () => async (dispatch: Dispatch<any>) => {
  try {
    const { projects, ...info } = await ApiAuth.me({
      embed: 'avatar,projects',
    });
    dispatch(setOwner(info));
    dispatch(updateProjects(projects));
  } catch (e) {
    dispatch(clearOwner());
    dispatch(authLogout());
  }
};
