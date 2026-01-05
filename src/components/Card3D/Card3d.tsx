import { Html } from "@react-three/drei";
import type { HtmlProps } from "@react-three/drei/web/Html";
import { memo, type ReactNode } from "react";

type Card3DProps = HtmlProps & {
  children: ReactNode;
  mobileDistance?: number;
  desktopDistance?: number;
};

const Card3D = memo(function Card3D({
  children,
  mobileDistance = 5,
  desktopDistance = 9,
  ...props
}: Card3DProps) {
  const isMobile = window.innerHeight <= 750 || window.innerWidth <= 750;

  return (
    <Html
      center
      distanceFactor={isMobile ? mobileDistance : desktopDistance}
      {...props}
    >
      <div className="card-3ds">
        {children}
      </div>
    </Html >
  );
});

export default Card3D;