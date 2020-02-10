import { 
    SECTION_DRAFT,
    SECTION_SAVE,
    SECTION_DELETE
 } from './constants';

 import {
    deleteLogin
 } from '../logins/actions.js';

export function draftSection(section) {
    if(!section.id) {
        section.id = `${Date.now()}`;
    }

    return {
        type: SECTION_DRAFT,
        draftValue: section
    };
}

export function saveSection(section) {
    return {
        type: SECTION_SAVE,
        section: section
    };
}

export function deleteSection(sectionId) {
    return function(dispatch, getState) {
        const logins = Object.values(getState().logins.byId);

        return Promise.all(logins.map(login => {
            if(login.sectionId !== sectionId) {
                return Promise.resolve();
            }

            return dispatch(deleteLogin(login.id));
        })).then(() => {
            return dispatch({
                type: SECTION_DELETE,
                id: sectionId
            });
        })
    }
}
