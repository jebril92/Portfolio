import { motion, AnimatePresence } from "framer-motion";
import { FC, useState, useRef, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { useAppDispatch } from "../redux/reduxHooks";
import { setNavHeight } from "../redux/navHeight";
import { useMediaQuery } from "react-responsive";
import { Link, animateScroll as scroll } from 'react-scroll'
import Image from "next/image";

const Nav: FC = () => {
  const [animationState, setAnimationState] = useState("notHovered");
  const navRef = useRef<HTMLElement>(null);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [hamburgerState, setHamburgerState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (navRef.current) {
      if (typeof window !== "undefined") {
        dispatch(
          setNavHeight(
            parseInt(window.getComputedStyle(navRef.current).height) + 30
          )
        );
      }
    }
  }, [dispatch]);
  return (
    <motion.nav
      className={`flex py-6 px-8 md:px-24 justify-between items-center sticky top-0 bg-bg-surface z-50 overflow-hidden ${
        isTabletOrMobile ? "flex-col" : "flex-row"
      }`}
      ref={navRef}
      layout
    >
      <motion.div
        className={
          isTabletOrMobile ? "flex justify-between items-center w-full" : ""
        }
        layout
      >
        <motion.div
          className="flex space-x-6 items-center"
          onHoverStart={() => {
            setAnimationState("hovered");
          }}
          onHoverEnd={() => {
            setAnimationState("notHovered");
          }}
          onTap={() => {
            setAnimationState("hovered");
            setTimeout(() => {
              setAnimationState("notHovered");
            }, 2000);
          }}
          layout
        >
          <motion.div
            className="border border-[#303436] rounded-md flex justify-center items-center overflow-hidden h-12 w-12"
            layout
          >
            <AnimatePresence mode='wait'>
              {animationState === "notHovered" && (
                <motion.figure
                  animate={{ x: 0, scale: 1, rotate: 0 }}
                  initial={{ x: -100 }}
                  exit={{
                    scale: 0,
                    rotate: 0,
                    transition: {
                      ease: [0.07, -0.04, 1, 0.4],
                      duration: 0.8,
                    },
                  }}
                  transition={{ duration: 0.5, type: "spring" }}
                  key={animationState}
                >
                  <BsPerson color="#C3C1BA" size={25} />
                </motion.figure>
              )}
            </AnimatePresence>
          </motion.div>
          <p
            className={`font-medium text-xl ${
              animationState === "hovered" ? "text-sky-400" : "text-white"
            }`}
          >
            Jebril H.
          </p>
        </motion.div>
        {isTabletOrMobile && (
          <div onClick={() => setHamburgerState(!hamburgerState)}>
            <motion.div
              animate={{
                rotate: hamburgerState ? 40 : 0,
                transformOrigin: "top left",
                marginBottom: hamburgerState ? "20px" : "10px",
              }}
              className="bg-white h-0.5 rounded-full w-9"
             />
            <motion.div
              animate={{
                rotate: hamburgerState ? -40 : 0,
                transformOrigin: "bottom left",
                marginTop: hamburgerState ? "20px" : "10px",
              }}
              className="bg-white h-0.5 rounded-full w-9"
             />
          </div>
        )}
      </motion.div>
      {!isTabletOrMobile && (
        <div className="text-[#FFFFFFFF] flex items-center space-x-16 rounded-md">
          <Link className="rounded-md border-4 border-sky-700 bg-sky-700" to="work" activeClass="active" smooth duration={200}> My works</Link>
          <Link className="rounded-md border-4 border-sky-700 bg-sky-700" to="tools" activeClass="active" smooth duration={200}>Tools</Link>
          <Link className="rounded-md border-4 border-sky-700 bg-sky-700" to="contact" activeClass="active" smooth duration={200}>Contact</Link>
        </div>
      )}
      <AnimatePresence>
        {isTabletOrMobile && hamburgerState && (
          <motion.div
            className="text-white-100 flex items-center flex-col text-xl space-y-4 mt-6"
            key={`${hamburgerState}`}
            layout
          >
            <a onClick={() => setHamburgerState(false)} href="#work">
              My works
            </a>
            <a onClick={() => setHamburgerState(false)} href="#tools">
              Tools
            </a>
            <a onClick={() => setHamburgerState(false)} href="#contact">
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Nav;
