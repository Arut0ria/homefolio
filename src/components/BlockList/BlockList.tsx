import { Instance, Instances, useGLTF } from "@react-three/drei";

import { animated, useSprings } from "@react-spring/three";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useMemo } from "react";
import { type Mesh } from "three";
import Card3D from "../Card3D/Card3d";
import IconPlane from "./components/IconPlane";
import useCubeDrag from "./hooks/useCubeDrag";
import { createCubeMaterial } from "./materials/materials";

useGLTF.preload("/cube_icon.glb");

type CubeListProps = {
  items: {
    title: string;
    texture: string;
  }[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
};

const AnimatedInstance = animated(Instance);
const AnimatedInstances = animated(Instances);

const BlockList = function BlockList(
  {
    items,
    currentIndex,
    onIndexChange
  }: CubeListProps
) {
  const { nodes } = useGLTF("/cube_icon.glb");

  // Springs animations
  const [springs, api] = useSprings(items.length, () => ({
    y: 2.0,
    config: { mass: 1, tension: 200.0, friction: 15 }
  }));

  useEffect(() => {
    api.start(index => ({
      y: index === currentIndex ? 2.5 : 2.0,
    }));
  }, [currentIndex, api]);

  // Stable const
  const { viewport } = useThree();
  const CUBE_OFFSET = 1.25 as const;
  const ROT_ICON = [0, 0, Math.PI * 1.5] as const;
  const SCALE_INSTANCES = [0.5, 0.5, 0.5] as const;
  const POSITION_PANEL = [0.0, 2.55, 0.0] as const;
  const POSITION_PANEL_GEOM = [viewport.width, viewport.height * 0.32] as const;
  const POSITION_CARD = [0.0, 1.75, 0.0] as const;

  // Dragging gesture
  const { xGroup, bind } = useCubeDrag({
    count: items.length,
    offset: CUBE_OFFSET,
    viewportWidth: viewport.width,
    currentIndex: currentIndex,
    onIndexChange: onIndexChange,
  });

  // Callbacks
  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
  }, []);

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onIndexChange(e.eventObject.userData.index);
  }, [onIndexChange]);
  
  // Materials
  const cubeMaterial = useMemo(() => (
    createCubeMaterial()
  ), []);

  return (<>
    {/* Drag panel */}
    <mesh name="DragPanel" {...bind()} position={POSITION_PANEL}>
      <planeGeometry args={POSITION_PANEL_GEOM} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>

    {/* Cubes and icons */}
    <AnimatedInstances
      limit={items.length}
      geometry={(nodes.RoundedCube as Mesh).geometry}
      material={cubeMaterial}
      position-x={xGroup}
    >
      {
        springs.map((spring, index) => (
          <AnimatedInstance
            position-x={index * CUBE_OFFSET}
            position-y={spring.y}
            scale={SCALE_INSTANCES}
            key={"cubeInst" + index}
            onPointerDown={handlePointerDown}
            onClick={handleClick}
            userData={{ index }}
          >
            <IconPlane
              rotation={ROT_ICON}
              texturePath={items[index].texture}
            />
            {
              index === currentIndex && (
                <Card3D
                  position={POSITION_CARD}
                  // Using index since items is immutable
                  key={"card" + index}
                >
                  <h2>{items.at(index)?.title}</h2>
                </Card3D>
              )
            }
          </AnimatedInstance>
        ))
      }
    </AnimatedInstances>
  </>);
};

export default BlockList;