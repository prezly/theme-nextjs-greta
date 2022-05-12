import { Elements } from '@prezly/content-renderer-react-js';
import type { StoryBookmarkNode } from '@prezly/story-content-format';
import { useEmbedStory } from '@prezly/theme-kit-nextjs';

interface Props {
    node: StoryBookmarkNode;
}

export function StoryBookmark({ node }: Props) {
    const embedStory = useEmbedStory(node.story.uuid);

    if (!embedStory) {
        return null;
    }

    return <Elements.StoryBookmark node={node} storyOEmbedInfo={embedStory.oembed} />;
}
