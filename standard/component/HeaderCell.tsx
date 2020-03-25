import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import delegate from '../delegate';

export default class extends React.PureComponent {
    static defaultProps = {
        labels: [],
    };

    render() {
        const {onClick, onLongPress} = this.props;
        const content = this._renderContent();
        const separatorLine = this._renderSeparatorLine();
        return onClick || onLongPress ? (
            <TouchableHighlight onPress={onClick} onLongPress={onLongPress}>
                <>
                    {content}
                    {separatorLine}
                </>
            </TouchableHighlight>
        ) : content;
    }

    _renderContent = () => {
        const {style, subTitle, right} = this.props;
        return (
            <View style={[styles.container, style]}>
                {this._renderIcon()}
                <View style={styles.layout}>
                    {this._renderTitleLine()}
                    {!!subTitle && (
                        <Text style={styles.subTitle} numberOfLines={1}>
                            {subTitle}
                        </Text>
                    )}
                </View>
                {typeof right === 'function' ? right() : right}
            </View>
        );
    };

    _renderSeparatorLine = () => {
        const {showBranchBottom} = this.props;
        const style = {
            backgroundColor: delegate.style.separatorLineColor,
            marginLeft: showBranchBottom ? 74 : 14,
            height: StyleSheet.hairlineWidth,
        };
        return <View style={style} />;
    };

    _renderTitleLine = () => {
        const {title, labels} = this.props;
        return (
            <View style={styles.titleline}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                {labels.map(this._renderLabel)}
            </View>
        );
    };
    
    _renderIcon = () => {
        const {avatar, showBranchTop, showBranchBottom} = this.props;
        const isAvatar = Object.prototype.isPrototypeOf(avatar) && avatar.imId;

        let centerView;
        if (isAvatar) {
            centerView = (
                <delegate.component.AvatarImage
                    {...avatar}
                    style={styles.avatar}
                />
            );
        } else {
            const src = typeof avatar === 'string' ?
                { uri: delegate.func.fitUrlForAvatarSize(avatar, 48) } :
                avatar;
            centerView = <Image style={styles.icon} resizeMode={'contain'} source={src} />;
        }

        let topStyle = {};
        if (showBranchTop) {
            topStyle = {backgroundColor: delegate.style.separatorLineColor}
            centerView = <View style={{flexDirection: 'row', width: 48, backgroundColor:'transparent'}}>
                <View style = {{flex: 1, backgroundColor:'transparent'}} />
                <View style = {styles.branchRow} />
            </View>
        }

        let bottomStyle = {};
        if (showBranchBottom) {
            bottomStyle = {
                backgroundColor: delegate.style.separatorLineColor,
                marginTop: showBranchTop ? 0 : 5,
            }
        }

        return (
            <View style={{alignItems: 'center'}}>
                <View style={[styles.branch, topStyle]}/>
                {centerView}
                <View style={[styles.branch, bottomStyle]}/>
            </View>
        )
    };

    _renderLabel = ({name, color}, index) => {
        return (
            <View key={index} style={[styles.label, {borderColor: color}]}>
                <Text style={[styles.labelText, {color}]}>
                    {name}
                </Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        backgroundColor: 'white',
    },
    icon: {
        height: 48,
        width: 48,
    },
    avatar: {
    },
    layout: {
        flex: 1,
        marginLeft: 12,
        height: 70,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleline: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#222',
    },
    label: {
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    labelText: {
        paddingHorizontal: 2,
        fontSize: 13,
    },
    subTitle: {
        fontSize: 14,
        color: '#999999',
        marginTop: 4,
    },
    branch: {
        backgroundColor: 'transparent',
        width: 1,
        flex: 1
    },
    branchRow: {
        backgroundColor: delegate.style.separatorLineColor,
        height: 0.5,
        flex: 1
    },
});