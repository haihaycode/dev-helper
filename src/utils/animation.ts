export const animationClasses = [
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "zoomOut",
  "zoomOutDown",
  "zoomOutLeft",
  "zoomOutRight",
  "zoomOutUp",
  "bounce",
  "bounceIn",
  "bounceOut",
  "bounceOutDown",
  "flip",
  "flipInX",
  "flipInY",
  "flipOutX",
  "flipOutY",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "rotateOut",
  "rotateOutDownLeft",
  "rotateOutDownRight",
  "rotateOutUpLeft",
  "rotateOutUpRight",
  "flash",
  "pulse",
  "rubberBand",
  "shake",
  "swing",
  "tada",
  "wobble",
  "lightSpeedIn",
  "lightSpeedOut",
];

//  https://www.theappguruz.com/tag-tools/web/CSSAnimations/
export const link = "https://www.theappguruz.com/tag-tools/web/CSSAnimations/";

export function getAnimationClass(index: number): string | undefined {
  if (index >= 0 && index < animationClasses.length) {
    return animationClasses[index];
  }
  return undefined;
}

export function getAnimationClassIndex(className: string): number | undefined {
  const index = animationClasses.indexOf(className);
  return index !== -1 ? index : undefined;
}
