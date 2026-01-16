import { useSpring, animated } from "@react-spring/web";

export default function AnimatedNumber({ number }) {
  const props = useSpring({
    number,
    from: { number: 0 },
    config: { duration: 800 },
  });

  return (
    <animated.p className="text-3xl font-bold">
      {props.number.to(n => n.toFixed(0))}
    </animated.p>
  );
}
