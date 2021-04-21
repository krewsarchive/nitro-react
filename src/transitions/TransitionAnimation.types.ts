import { ReactNode } from 'react';

export interface TransitionAnimationProps
{
    type: string;
    inProp: boolean;
    timeout?: number;
    className?: string;
    children?: ReactNode;
}

export class TransitionAnimationTypes
{
    public static BOUNCE: string = 'bounce';
    public static SLIDE_LEFT: string = 'slideLeft';
    public static FLIP_X: string = 'flipX';
    public static FADE_DOWN: string = 'fadeDown';
    public static FADE_UP: string = 'fadeUp';
    public static HEAD_SHAKE: string = 'headShake';
}
