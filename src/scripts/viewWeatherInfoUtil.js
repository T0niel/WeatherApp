export default function (
  prevBtnSelector,
  nextBtnSelector,
  scrollableContainerSelector,
  scrollingfactor,
  updateTimage = 100
) {
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  const scrollableContainer = document.querySelector(
    scrollableContainerSelector
  );

  let lastMouseDown = null;

  const startInterval = () => setInterval(() => {
    if (lastMouseDown === prevBtn) {
      scrollableContainer.scrollLeft -= scrollingfactor;
    } else if (lastMouseDown === nextBtn) {
      scrollableContainer.scrollLeft += scrollingfactor;
    }
  }, updateTimage)

  let interval = null;

  prevBtn.addEventListener("mousedown", () => {
    interval = startInterval();
    lastMouseDown = prevBtn;

    scrollableContainer.scrollLeft -= scrollingfactor;
  });

  nextBtn.addEventListener("mousedown", () => {
    interval = startInterval();
    lastMouseDown = nextBtn;

    scrollableContainer.scrollLeft += scrollingfactor;
  });

  prevBtn.addEventListener("mouseup", () => {
    clearInterval(interval)
    interval = null;
    lastMouseDown = null;
  });

  nextBtn.addEventListener("mouseup", () => {
    clearInterval(interval);
    interval = null;
    lastMouseDown = null;
  });
}
