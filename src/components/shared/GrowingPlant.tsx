import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { useEffect, useState } from "react";

type BranchProps = {
  path: string;
  showAt: number;
  progress: MotionValue<number>;
};

type LeafProps = {
  x: number;
  y: number;
  rotation: number;
  showAt: number;
  side: "left" | "right";
  progress: MotionValue<number>;
};

type FlowerProps = {
  x: number;
  y: number;
  showAt: number;
  progress: MotionValue<number>;
};

export function GrowingPlant() {
    const [isPlantEnabled, setIsPlantEnabled] = useState(true);

    useEffect(() => {
    const savedPreference = localStorage.getItem("growing-plant-enabled");

    if (savedPreference !== null) {
        setIsPlantEnabled(savedPreference === "true");
    }

    const handlePlantVisibility = (event: Event) => {
        const customEvent = event as CustomEvent<boolean>;
        setIsPlantEnabled(customEvent.detail);
    };

    window.addEventListener(
        "growing-plant-visibility",
        handlePlantVisibility,
    );

    return () => {
        window.removeEventListener(
        "growing-plant-visibility",
        handlePlantVisibility,
        );
    };
    }, []);

  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  const vineLength = reduceMotion ? 1 : progress;

  const topGlowOpacity = useTransform(
    progress,
    [0, 0.25, 1],
    [0.12, 0.26, 0.4],
  );

    if (!isPlantEnabled) {
    return null;
    }

  return (
    <aside
    aria-hidden="true"
    className="
        pointer-events-none fixed bottom-0 left-0 top-[72px] z-30
        hidden w-[145px] overflow-visible md:block lg:w-[190px]
    "
    >
      {/* Brilho suave próximo ao início da planta */}
      <motion.div
        style={{ opacity: topGlowOpacity }}
        className="
          absolute -left-12 -top-16 h-64 w-60
          rounded-full bg-emerald-300/40 blur-3xl
        "
      />

        <svg
        viewBox="0 0 180 1000"
        preserveAspectRatio="none"
        className="
            absolute inset-0 h-full w-full origin-top-left
            scale-[0.9] overflow-visible lg:scale-100
        "
        >
        <defs>
          <linearGradient
            id="hangingVineStem"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#315f35" />
            <stop offset="50%" stopColor="#4e914e" />
            <stop offset="100%" stopColor="#78b95f" />
          </linearGradient>

          <linearGradient
            id="hangingVineLeaf"
            x1="0"
            y1="1"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="#3f8f4f" />
            <stop offset="100%" stopColor="#91d36f" />
          </linearGradient>

          <filter
            id="hangingVineShadow"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor="#15331b"
              floodOpacity="0.2"
            />
          </filter>

          <filter
            id="hangingFlowerShadow"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3"
              floodColor="#813c22"
              floodOpacity="0.18"
            />
          </filter>
        </defs>

        {/* Caule principal crescendo de cima para baixo */}
        <motion.path
          d="
            M48 -20
            C42 45, 78 82, 59 145
            C41 205, 91 245, 65 310
            C40 370, 90 420, 61 480
            C35 540, 87 590, 58 650
            C33 710, 85 760, 55 820
            C35 865, 68 920, 51 1020
          "
          fill="none"
          stroke="url(#hangingVineStem)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{ pathLength: vineLength }}
          filter="url(#hangingVineShadow)"
        />

        {/* Reflexo do caule */}
        <motion.path
          d="
            M48 -20
            C42 45, 78 82, 59 145
            C41 205, 91 245, 65 310
            C40 370, 90 420, 61 480
            C35 540, 87 590, 58 650
            C33 710, 85 760, 55 820
            C35 865, 68 920, 51 1020
          "
          fill="none"
          stroke="#b3dfa0"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          style={{ pathLength: vineLength }}
          opacity="0.55"
        />

        {/* Primeiro nível */}
        <Branch
          path="M59 145 C80 139, 103 123, 122 101"
          showAt={0.1}
          progress={progress}
        />

        <Leaf
          x={120}
          y={102}
          rotation={-28}
          showAt={0.12}
          side="right"
          progress={progress}
        />

        <Leaf
          x={57}
          y={157}
          rotation={24}
          showAt={0.15}
          side="left"
          progress={progress}
        />

        {/* Segundo nível */}
        <Branch
          path="M65 310 C45 299, 30 281, 18 254"
          showAt={0.25}
          progress={progress}
        />

        <Leaf
          x={19}
          y={254}
          rotation={28}
          showAt={0.27}
          side="left"
          progress={progress}
        />

        <Leaf
          x={65}
          y={322}
          rotation={-26}
          showAt={0.3}
          side="right"
          progress={progress}
        />

        {/* Terceiro nível */}
        <Branch
          path="M61 480 C81 471, 103 451, 124 424"
          showAt={0.42}
          progress={progress}
        />

        <Leaf
          x={122}
          y={425}
          rotation={-30}
          showAt={0.44}
          side="right"
          progress={progress}
        />

        <Leaf
          x={59}
          y={493}
          rotation={23}
          showAt={0.48}
          side="left"
          progress={progress}
        />

        {/* Quarto nível */}
        <Branch
          path="M58 650 C39 640, 26 620, 16 596"
          showAt={0.59}
          progress={progress}
        />

        <Leaf
          x={17}
          y={596}
          rotation={30}
          showAt={0.61}
          side="left"
          progress={progress}
        />

        <Leaf
          x={57}
          y={663}
          rotation={-26}
          showAt={0.65}
          side="right"
          progress={progress}
        />

        {/* Quinto nível */}
        <Branch
          path="M55 820 C76 813, 100 793, 119 767"
          showAt={0.76}
          progress={progress}
        />

        <Leaf
          x={118}
          y={767}
          rotation={-29}
          showAt={0.78}
          side="right"
          progress={progress}
        />

        <Leaf
          x={54}
          y={835}
          rotation={24}
          showAt={0.82}
          side="left"
          progress={progress}
        />

        {/* Folhas da ponta */}
        <Leaf
          x={51}
          y={950}
          rotation={-25}
          showAt={0.89}
          side="right"
          progress={progress}
        />

        <Leaf
          x={48}
          y={972}
          rotation={25}
          showAt={0.92}
          side="left"
          progress={progress}
        />

        {/* Flores */}
        <Flower
          x={121}
          y={82}
          showAt={0.84}
          progress={progress}
        />

        <Flower
          x={19}
          y={234}
          showAt={0.87}
          progress={progress}
        />

        <Flower
          x={123}
          y={405}
          showAt={0.9}
          progress={progress}
        />

        <Flower
          x={17}
          y={576}
          showAt={0.93}
          progress={progress}
        />

        <Flower
          x={118}
          y={747}
          showAt={0.96}
          progress={progress}
        />

        <Flower
          x={50}
          y={948}
          showAt={0.98}
          progress={progress}
        />
      </svg>


    </aside>
  );
}

function Branch({ path, showAt, progress }: BranchProps) {
  const pathLength = useTransform(
    progress,
    [showAt, showAt + 0.07],
    [0, 1],
  );

  const opacity = useTransform(
    progress,
    [showAt, showAt + 0.02],
    [0, 1],
  );
  

  
  return (
    <motion.path
      d={path}
      fill="none"
      stroke="#57984f"
      strokeWidth="6"
      strokeLinecap="round"
      pathLength={1}
      style={{
        pathLength,
        opacity,
      }}
    />
  );
}

function Leaf({
  x,
  y,
  rotation,
  showAt,
  side,
  progress,
}: LeafProps) {
  const opacity = useTransform(
    progress,
    [showAt, showAt + 0.04],
    [0, 1],
  );

  const scale = useTransform(
    progress,
    [showAt, showAt + 0.065],
    [0, 1],
  );

  const leafPath =
    side === "right"
      ? "M0 0 C17 -27, 48 -28, 62 -7 C44 12, 19 15, 0 0 Z"
      : "M0 0 C-17 -27, -48 -28, -62 -7 C-44 12, -19 15, 0 0 Z";

  const veinPath =
    side === "right"
      ? "M0 0 C18 -9, 35 -11, 50 -8"
      : "M0 0 C-18 -9, -35 -11, -50 -8";

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <motion.g
        style={{
          opacity,
          scale,
          transformOrigin: "0px 0px",
        }}
        animate={{
          rotate: [-1.3, 1.3, -1.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d={leafPath}
          fill="url(#hangingVineLeaf)"
          stroke="#397944"
          strokeWidth="2"
          filter="url(#hangingVineShadow)"
        />

        <path
          d={veinPath}
          fill="none"
          stroke="#ddf2d2"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.72"
        />
      </motion.g>
    </g>
  );
}

function Flower({
  x,
  y,
  showAt,
  progress,
}: FlowerProps) {
  const opacity = useTransform(
    progress,
    [showAt, showAt + 0.025],
    [0, 1],
  );

  const scale = useTransform(
    progress,
    [showAt, showAt + 0.055],
    [0, 1],
  );

  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        style={{
          opacity,
          scale,
          transformOrigin: "0px 0px",
        }}
        animate={{
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        filter="url(#hangingFlowerShadow)"
      >
        <circle cx="0" cy="-8" r="8" fill="#fbb180" />
        <circle cx="8" cy="0" r="8" fill="#f69c68" />
        <circle cx="0" cy="8" r="8" fill="#fbb180" />
        <circle cx="-8" cy="0" r="8" fill="#f69c68" />

        <circle
          cx="0"
          cy="0"
          r="5"
          fill="#f5ce55"
          stroke="#d59b2d"
          strokeWidth="1"
        />
      </motion.g>
    </g>
  );
}