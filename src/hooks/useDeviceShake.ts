import { useEffect, useRef } from 'react';

export const useDeviceShake = (onShake: () => void) => {
  const lastShakeTimeRef = useRef(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let lastUpdate = 0;

    const handleMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current) return;

      const curTime = Date.now();
      if (curTime - lastUpdate > 100) {
        const diffTime = curTime - lastUpdate;
        lastUpdate = curTime;

        const x = current.x || 0;
        const y = current.y || 0;
        const z = current.z || 0;

        const speed = (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

        // Shake detection threshold
        if (speed > 800) {
          const now = Date.now();
          if (now - lastShakeTimeRef.current > 1500) {
            lastShakeTimeRef.current = now;
            onShake();
          }
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion, false);
    }

    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion, false);
      }
    };
  }, [onShake]);
};
