var animation = bodymovin.loadAnimation({
    container:  document.getElementById('loading-sign'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'GNsign_loading.json',
  })


  function loadingPen(){
    document.querySelector("main").style.display = "none";
    document.querySelector("header").style.display = "none";
    document.querySelector(".loading").style.display = "block";
    setTimeout(function () {
            $(document).ready(function () {
                document.querySelector(".loading").style.display = "none";
                document.querySelector("main").style.display = "block";
                document.querySelector("header").style.display = "block";
            });
    }, 2500);
}

loadingPen();