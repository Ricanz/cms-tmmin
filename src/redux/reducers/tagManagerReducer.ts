// src/redux/reducers/counterReducer.ts

import TagManager from "../../tagging/TagManager";
import { TAG_MANAGER } from "../actions/tagManagerAcrion";


const initialState = {
    tagManager: new TagManager(),
};

const tagManager = (state = initialState, action: any) => {
    switch (action.type) {
        case TAG_MANAGER:
            return { ...state, ...action.props };
        default:
            return state;
    }
};

export default tagManager;
