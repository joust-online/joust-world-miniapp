import { LazyMotion, domAnimation } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () => Promise.resolve(domAnimation);
export { LazyMotion, m, loadFeatures };
