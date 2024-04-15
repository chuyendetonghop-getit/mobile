import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {Reaction} from 'react-native-reactions';
import FastImage from 'react-native-fast-image';

import {
    icon_angry,
    icon_like,
    icon_lol,
    icon_love,
    icon_sad,
    icon_thumb_down,
} from 'assets';
import {getSize} from 'themes';
import {ReacttionItem} from 'types';
import {EReactionType} from 'utils/enums';

type AppReactionsButtonProps = {
    reactionItems?: ReacttionItem[];
    isShowCardInCenter?: boolean;
    onTap?: (e: ReacttionItem) => void;
    onPress?: () => void;
};
const styles = StyleSheet.create({
    icon: {
        width: getSize(28),
        height: getSize(28),
    },
    reaction: {
        width: getSize(32),
        height: getSize(32),
    },
});
export const ReactionItems: ReacttionItem[] = [
    {
        id: EReactionType.LOVE,
        emoji: <FastImage source={icon_love} style={styles.reaction} />,
        title: 'Love',
        source: icon_love,
    },
    {
        id: EReactionType.LIKE,
        emoji: <FastImage source={icon_like} style={styles.reaction} />,
        title: 'Like',
        source: icon_like,
    },
    {
        id: EReactionType.LOL,
        emoji: <FastImage source={icon_lol} style={styles.reaction} />,
        title: 'Haha',
        source: icon_lol,
    },
    {
        id: EReactionType.SAD,
        emoji: <FastImage source={icon_sad} style={styles.reaction} />,
        title: 'Sad',
        source: icon_sad,
    },
    {
        id: EReactionType.ANGRY,
        emoji: <FastImage source={icon_angry} style={styles.reaction} />,
        title: 'Angry',
        source: icon_angry,
    },
    {
        id: EReactionType.THUMSP_DOWN,
        emoji: <FastImage source={icon_thumb_down} style={styles.reaction} />,
        title: 'Dislike',
        source: icon_thumb_down,
    },
];

const AppReactionsButton = (
    props: PropsWithChildren<AppReactionsButtonProps>,
) => {
    const {
        onTap,
        reactionItems = ReactionItems,
        children,
        onPress,
        isShowCardInCenter,
    } = props;
    return (
        <Reaction
            isShowCardInCenter={isShowCardInCenter}
            onPress={onPress}
            type="modal"
            items={reactionItems as any}
            onTap={onTap as any}>
            {children as any}
        </Reaction>
    );
};

export default AppReactionsButton;
