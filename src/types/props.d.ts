import { ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface WithLayout extends BaseProps {
  layout?: boolean;
}

export interface WithLoading extends BaseProps {
  loading?: boolean;
}

export type CommonProps = BaseProps & WithLayout & WithLoading; 