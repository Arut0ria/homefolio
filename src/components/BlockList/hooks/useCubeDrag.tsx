import { useSpring } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { MathUtils } from "three";

type useCubeDragProps = {
  count: number;
  offset: number;
  viewportWidth: number;
  onIndexChange: (i: number) => void;
  currentIndex: number,
};

function getIndexFromPosition(
  positionX: number,
  length: number,
  offset: number
) {
  return MathUtils.clamp(
    Math.round(-positionX / offset),
    0,
    length - 1
  );
}

function setCursor(c: string) {
  document.body.style.cursor = c;
}

export default function useCubeDrag({
  count,
  offset,
  viewportWidth,
  onIndexChange,
  currentIndex,
}: useCubeDragProps) {
  const [{ xGroup }, api] = useSpring(() => ({
    xGroup: currentIndex * -offset,
    config: { mass: 2.0, tension: 100, friction: 40 }
  }), [currentIndex]);

  const dragBind = useDrag(
    ({ active, movement: [mx], memo }) => {
      // init memo au début du drag
      if (!memo) memo = xGroup.get();

      const x = memo + (mx / window.innerWidth) * viewportWidth;

      if (active) {
        api.start({ xGroup: x, immediate: true });
        setCursor("grabbing");
      } else {
        const index = getIndexFromPosition(
          xGroup.get(),
          count,
          offset
        );

        api.start({
          xGroup: index * -offset,
          onStart: () => onIndexChange(index),
          config: {
            mass: 1.0,
            tension: 200.0,
            friction: 5.0
          }
        });

        setCursor("grab");
      }

      return memo;
    }
  );

  const bind = {
    ...dragBind(),
    onPointerOver: () => setCursor('grab'),
    onPointerOut: () => setCursor('default'),
  }

  return { xGroup, bind };
}