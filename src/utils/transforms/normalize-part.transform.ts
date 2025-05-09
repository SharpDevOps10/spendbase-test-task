import { TransformFnParams } from 'class-transformer';

export const normalizePartTransform = ({ value }: TransformFnParams): string => {
  if (typeof value !== 'string') return value;

  return value
    .split(',')
    .map((s) => s.trim())
    .join(',');
};