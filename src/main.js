console.log("hello main");

document.getElementById("btn").onclick = function () {
  import(
    /* webpackChunkName: "math", webpackPrefetch: true */ "./js/math"
  ).then(({ mul }) => {
    console.log(mul(3, 3));
  });
};
