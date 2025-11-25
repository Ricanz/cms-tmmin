import React from 'react';
import TagManager from './TagManager';
import { useSelector } from 'react-redux';

interface PropsMain {
    tag: string;
    tagManager: TagManager;
    [key: string]: any;
}

interface StateMain { }

class TagComponent extends React.Component<PropsMain, StateMain> {
    render() {
        if (this.props.tag === "button-ext") {
            return this.props.children;
        } else {
            return null;
        }
    }
}

const EnhancedTagComponent: React.FC<Omit<PropsMain, 'tagManager'>> = (props) => {
    const tagManager = useSelector((state: any) => state.tagManager.tagManager);
    return <TagComponent
        {...props}
        tag={props.tag}
        tagManager={tagManager}
    />;
};

export default EnhancedTagComponent;
