import { 
    SECTION_DRAFT,
    SECTION_SAVE,
    SECTION_DELETE
 } from './constants';

export default function sections(
    state = {
        byId: {},
        draftValue: {}
    },
    action,
) {
    switch (action.type) {
        case SECTION_DRAFT:
            return {
                ...state,
                draftValue: action.draftValue
            };
        case SECTION_SAVE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.section.id]: action.section
                },
                draftValue: {}
            };

        case SECTION_DELETE:
            delete state.byId[action.id];
            
            return {
                ...state
            };

        default:
            return state;
    }
}
