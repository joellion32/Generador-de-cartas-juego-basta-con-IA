import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { colors } from '../../config/theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    rank: number;
    name: string;
    score: number;
    isHighlighted?: boolean;
    scoreButtonsVisible?: boolean;
    deletedButtonVisible?: boolean;
    onAdd?: () => void;
    onRemove?: () => void;
    onDelete?: () => void
}

export const LeaderboardItem: React.FC<Props> = ({
    rank,
    name,
    score,
    isHighlighted,
    scoreButtonsVisible = false,
    deletedButtonVisible = false,
    onAdd,
    onRemove,
    onDelete
}) => {
    return (
        <View style={[styles.container, isHighlighted && styles.highlight]}>

            {/* RANK */}
            <View style={styles.rankContainer}>
                <Text
                    style={[
                        styles.rankText
                    ]}
                >
                    #{rank}
                </Text>
            </View>

            {/* AVATAR */}
            <View style={styles.avatarContainer}>
                <Ionicons
                    name="person-circle"
                    size={42}
                    color="#FFFFFF"
                />
            </View>

            {/* NAME */}
            <Text style={styles.name}>{name}</Text>

            {/* SCORE CONTROLS */}
            <View style={styles.scoreContainer}>
                {
                    scoreButtonsVisible && <TouchableOpacity onPress={onRemove} style={styles.actionButton}>
                        <Text style={styles.actionText}>−</Text>
                    </TouchableOpacity>
                }

                {
                    deletedButtonVisible ? <TouchableOpacity onPress={onDelete} style={[styles.actionButton]}>
                        <Text style={styles.actionText}>x</Text>
                    </TouchableOpacity> : <Text style={styles.score}>{score.toLocaleString()} PTS</Text>
                }

                {
                    scoreButtonsVisible && <TouchableOpacity onPress={onAdd} style={styles.actionButtonAdd}>
                        <Text style={styles.actionTextAdd}>+</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
    },

    highlight: {
        backgroundColor: colors.secondary,
    },

    rankContainer: {
        width: 40,
        alignItems: 'center',
    },

    rankText: {
        color: colors.text,
        fontWeight: '700',
    },

    avatarContainer: {
        marginHorizontal: 8,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },
    avatarPlaceholder: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#3A4BFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        color: colors.text,
        fontWeight: '700',
    },

    name: {
        flex: 1,
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
    },

    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    score: {
        width: 50,
        textAlign: 'center',
        color: colors.text,
        fontWeight: '700',
        fontSize: 16,
    },

    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionButtonAdd: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionText: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
    },

    actionTextAdd: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
    },
});
