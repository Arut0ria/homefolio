import { Canvas } from "@react-three/fiber";
import Background from "./Background/Background";

import { useState } from "react";
import BlockList from "./BlockList/BlockList";
import MarkdownPage from "./MardownPage/MarkdownPage";
import data_json from "/src/assets/data.json?raw";

export default function Scene() {
  const data = JSON.parse(data_json);

  const [currentIndex, setCurrentIndex] = useState(0);

  return (<>
    <Canvas
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
    >
      <Background />
      <BlockList
        items={data["data"]}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
      {/* <ambientLight intensity={2.0} color={new Color(1, 1, 1)} /> */}
      {/* <OrbitControls /> */}
    </Canvas>
    <MarkdownPage
      path={
        data["data"][currentIndex]["content"]
      }
    />
  </>);
}