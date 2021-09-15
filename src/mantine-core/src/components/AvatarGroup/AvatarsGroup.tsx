import React from 'react';
import cx from 'clsx';
import { Avatar, Text } from '@mantine/core';
import { DefaultProps, MantineNumberSize, useMantineTheme, mergeStyles } from '../../theme';
import useStyles from './AvatarsGroup.styles';

export type AvatarsGroupStylesNames = keyof ReturnType<typeof useStyles>;

export interface AvatarsGroupProps extends
  DefaultProps<AvatarsGroupStylesNames>,
  React.ComponentPropsWithoutRef<'div'> {
  /** <Avatar /> components only */
  children?: React.ReactNode;

  /** Avatar width */
  size?: MantineNumberSize;

  /** Avatar radius */
  radius?: MantineNumberSize;

  /** Maximum number of Avatar components rendered */
  max?: number;
}

export function AvatarsGroup({
  className,
  style,
  children,
  size = 'md',
  radius = 'xl',
  max = 2,
  themeOverride,
  classNames,
  styles,
  ...others
}: AvatarsGroupProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme }, classNames, 'avatar-group');
  const _styles = mergeStyles(classes, styles);
  const avatars = React.Children
    .toArray(children).filter((child: React.ReactElement) => child.type === Avatar)
    .map((child: React.ReactElement, index) =>
      React.cloneElement(child, {
        size,
        radius,
        themeOverride,
        key: index,
        className: cx(classes.child, child.props.className),
        style: { ...child.props.style, ..._styles.child },
      })
    );

  const clampedMax = max < 2 ? 2 : max;
  const extraAvatars = avatars.length > clampedMax ? avatars.length - clampedMax : 0;

  return (
    <div className={cx(classes.root)} style={{ ...style, ..._styles.root }} {...others}>
      {avatars.slice(0, avatars.length - extraAvatars)}
      {extraAvatars ? (
        <Avatar size={size} radius={radius} className={classes.child} style={_styles.child}>
          <Text size={size} className={classes.number} style={_styles.number}>
            +{extraAvatars}
          </Text>
        </Avatar>) : null
      }
    </div>
  );
}

AvatarsGroup.displayname = '@mantine/core/AvatarsGroup';
