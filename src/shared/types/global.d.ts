declare module "*.jpg" {
  const content: string;
  export default content;
}
declare module "*.png" {
  const content: string;
  export default content;
}
declare module "*.webp" {
  const content: string;
  export default content;
}
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module "*.scss" {
  type ClassNames = Record<string, string>;
  const classNames: ClassNames;
  export = classNames;
}
declare module "*.gif" {
  const content: string;
  export default content;
}

// {
//   import { ImageSourcePropType } from 'react-native'

//   const content: ImageSourcePropType

//   export default content
// };
