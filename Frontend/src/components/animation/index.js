import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Fade In from Left (X-Axis)
export const FadeInFromLeft = (id) => {
  return gsap.fromTo(
    id,
    { opacity: 0, x: -100 }, // Start from the left
    {
      opacity: 1,
      x: 0, // Move to original position
      duration: 1,
    }
  );
};

// 2. Fade In from Right (X-Axis)
export const FadeInFromRight = (id) => {
  return gsap.fromTo(
    id,
    { opacity: 0, x: 100 }, // Start from the right
    {
      opacity: 1,
      x: 0, // Move to original position
      duration: 1,
    }
  );
};

// 3. Fade In with Scroll Trigger (Y-Axis)
export const FadeInWithScrollTrigger = (id) => {
  return gsap.fromTo(
    id,
    { opacity: 0, y: 50 }, // Start from below
    {
      opacity: 1,
      y: 0, // Move to original position
      duration: 4,
      scrollTrigger: {
        trigger: id,
        start: "top 80%",  // When the element is 80% from the top of the viewport
        end: "top 30%",    // When the element is 30% from the top of the viewport
        scrub: true,       // Smooth scrubbing
      },
    }
  );
};

// 4. Fade In with Scroll Trigger from Left (X-Axis)
export const FadeInFromLeftWithScrollTrigger = (id) => {
  return gsap.fromTo(
    id,
    { opacity: 0, x: -100 }, // Start from the left
    {
      opacity: 1,
      x: 0, // Move to original position
      duration: 4,
      scrollTrigger: {
        trigger: id,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    }
  );
};

// 5. Fade In from Right with Scroll Trigger (X-Axis)
export const FadeInFromRightWithScrollTrigger = (id) => {
  return gsap.fromTo(
    id,
    { opacity: 0, x: 100 }, // Start from the right
    {
      opacity: 1,
      x: 0, // Move to original position
      duration: 4,
      scrollTrigger: {
        trigger: id,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    }
  );
};

export const StaggeredCardAnimationWithScrollTrigger = (containerId, cardClass) => {
  return gsap.fromTo(
    `${containerId} ${cardClass}`, // Target all cards within the container
    { opacity: 0, y: 50 }, // Initial state
    {
      opacity: 1,
      y: 0, // End state
      duration: 1,
      stagger: 0.5, // Delay between each card's animation
      scrollTrigger: {
        trigger: containerId, // The container is the trigger
        start: "top 80%", // Start animation when the top of the container is 80% from the top of the viewport
        end: "top 30%", // End animation when the top of the container is 30% from the top of the viewport
        scrub: true, // Smooth scrubbing
      },
    }
  );
};