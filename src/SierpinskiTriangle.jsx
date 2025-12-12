import React, { Suspense, use, useDeferredValue } from "react";
import Dot from "./Dot";
import * as Scheduler from "scheduler";
const targetSize = 25;

const cache = new Map();
function getDelay(key, number) {
  if (!cache.has(key)) {
    cache.set(
      key,
      new Promise((resolve) => {
        Scheduler.unstable_runWithPriority(
          Scheduler.unstable_IdlePriority,
          () => {
            // Artificially long execution time.
            const e = performance.now() + 0.1;
            while (performance.now() < e) {}
            resolve(number);
          }
        );
      })
    );
  }
  return cache.get(key);
}
function SierpinskiTriangle({ x, y, s, children }) {
  const number = use(getDelay(`${x}-${y}-${s}-${children}`, children));
  if (s <= targetSize) {
    return (
      <Dot
        x={x - targetSize / 2}
        y={y - targetSize / 2}
        size={targetSize}
        text={number}
      />
    );
  }

  s /= 2;

  return (
    <div>
      <SierpinskiTriangle x={x} y={y - s / 2} s={s}>
        {children}
      </SierpinskiTriangle>

      <SierpinskiTriangle x={x - s} y={y + s / 2} s={s}>
        {children}
      </SierpinskiTriangle>

      <SierpinskiTriangle x={x + s} y={y + s / 2} s={s}>
        {children}
      </SierpinskiTriangle>
    </div>
  );
}

export default React.memo(SierpinskiTriangle);
