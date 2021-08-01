interface props {
  containerWidth: number | undefined;
  containerHeight: number | undefined;
  videoCount: number;
  aspectRatio: number;
}

const recalculateLayout = ({
  containerWidth,
  containerHeight,
  videoCount,
  aspectRatio
}: props) => {  
  let width = 0;
  let height = 0;
  let rows = 0;
  let best = {
    area: 0,
    cols: 0,
    rows: 0,
    width: 0,
    height: 0,
  };

  const calculateLayout = () => {
    if (containerWidth !== undefined && containerHeight !== undefined) {
      let startCols = videoCount;
      let colDelta = -1;

      for (let cols = startCols; cols > 0; cols += colDelta) {
        rows = Math.ceil(videoCount / cols);
        const hScale = containerWidth / (cols * aspectRatio);
        const vScale = containerHeight / rows;
        if (hScale <= vScale) {
          width = containerWidth / cols;
          height = width / aspectRatio;
        } else {
          height = containerHeight / rows;
          width = height * aspectRatio;
        }
        const area = width * height;
        if (area > best.area) {
          best = { width, height, rows, cols, area };
        }
      }

      const body = document.getElementsByTagName("body")[0];
      body.style.setProperty("--video-width", best.width + "px");
      body.style.setProperty("--video-height", best.height + "px");
      body.style.setProperty("--cols", best.cols + "");
      body.style.setProperty("--rows", best.rows + "");
    }
  };

  calculateLayout();  
};

export default recalculateLayout;
