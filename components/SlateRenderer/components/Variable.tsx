import { VariableNode } from '@prezly/story-content-format';
import { useCurrentStory } from '@prezly/theme-kit-nextjs';
import { StoryPublicationDate } from '@prezly/themes-ui-components';

interface Props {
    node: VariableNode;
}

export function Variable({ node }: Props) {
    const currentStory = useCurrentStory();

    if (!currentStory) {
        return null;
    }

    if (node.key === VariableNode.Key.PUBLICATION_DATE) {
        return <StoryPublicationDate story={currentStory} />;
    }

    return null;
}
