var loop = 1e2;

let data = [Array(loop), Array(loop)];

for (var i = 0; i < loop; i++) {
  let x = (2 * Math.PI * i) / loop;
  let y = Math.sin(x);

  data[0][i] = x;
  data[1][i] = y;
}

function getSize() {
  return {
    width: window.innerWidth - 100,
    height: window.innerHeight - 200,
  };
}

const opts = {
  title: 'Resize',
  ...getSize(),
  scales: {
    x: {
      time: false,
    },
    y: {
      auto: false,
      range: [-1.5, 1.5],
    },
  },
  series: [
    {
      label: 'x',
    },
    {
      label: 'sin(x)',
      stroke: 'red',
    },
  ],
};

let u = new uPlot(opts, data, document.body);

function throttle(cb, limit) {
  var wait = false;

  return () => {
    if (!wait) {
      requestAnimationFrame(cb);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

//	window.addEventListener("resize", throttle(() => u.setSize(getSize()), 100));
window.addEventListener('resize', (e) => {
  u.setSize(getSize());
});
