import {
  Suspense,
  useState,
  useTransition,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import SierpinskiTriangle from "./SierpinskiTriangle";

const App = forwardRef(({ elapsed }, elementRef) => {
  const [seconds, setSeconds] = useState(0);
  const [pending, startTransition] = useTransition();

  const t = (elapsed / 1000) % 10;
  const scale = 1 + (t > 5 ? 10 - t : t) / 10;
  const transform = "scaleX(" + scale / 2.1 + ") scaleY(0.7) translateZ(0.1px)";

  useEffect(() => {
    const tick = () => {
      window.event = "click";
      startTransition(async () => {
        setSeconds((prev) => (prev % 10) + 1);
      });
    };

    const intervalID = setInterval(tick, 1000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="container" style={{ transform }}>
      <div>
        <Suspense>
          <SierpinskiTriangle x={0} y={0} s={1000}>
            {seconds}
          </SierpinskiTriangle>
        </Suspense>
      </div>
    </div>
  );
});

export default App;
