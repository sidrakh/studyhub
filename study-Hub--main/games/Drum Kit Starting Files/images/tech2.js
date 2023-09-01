const world = Globe()(document.getElementById("globe"))
  .backgroundColor("rgba(0,0,0,0)")
  .showGlobe(false)
  .showGraticules(true)
  .showAtmosphere(true)
  .atmosphereColor("#000000")
  .atmosphereAltitude("0.5");

const handleMouseOver = (e) => {
  let scale = 0.005;
  let orbit = world.scene();
  orbit.rotation.y = (orbit.rotation.y + e.movementX * scale) % (Math.PI * 2);
  if (e.movementY < 0) {
    world.camera().zoom = world.camera().zoom + 0.01;
    world.camera().zoom = Math.min(world.camera().zoom, 2);
    world.camera().updateProjectionMatrix();
  } else {
    world.camera().zoom = world.camera().zoom - 0.01;
    world.camera().zoom = Math.max(world.camera().zoom, 1);
    world.camera().updateProjectionMatrix();
  }
  orbit.rotation.z = 0; //this is important to keep the camera level..
};

// Type 1: Custom mouseover effect (for desktop)
document.addEventListener("mousemove", handleMouseOver);

// Type 2: Simple constant rotation (for phone)
if (mobileAndTabletCheck()) {
  world.controls().autoRotate = true;
  world.controls().autoRotateSpeed = 1;
}

if (window.innerHeight > window.innerWidth) {
  world.width(window.innerWidth);
} else {
  world.height(window.innerHeight);
}

fetch("https://unpkg.com/world-atlas/land-110m.json")
  .then((res) => res.json())
  .then((landTopo) => {
    world
      .polygonsData(topojson.feature(landTopo, landTopo.objects.land).features)
      .polygonCapMaterial(
        // make a blueish transperent material
        new THREE.MeshPhongMaterial({
          color: "#1B3C59",
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        })
      )
      .polygonSideColor(() => "rgba(0,0,0,0)")
      .polygonStrokeColor(() => "#397DC9")
      .onPolygonHover((polygon) => {});
  });

let socialLinks = {
  facebook: "https://www.facebook.com/srmscetbly/",
  twitter: "",
  instagram: "https://www.instagram.com/srmstrust/?hl=en",
  youtube: "https://www.youtube.com/srmstrust",
  medium: "",
  linkedin: "",
};

let isSocialOpen = 1;
let isMenuOpen = 0;
const animationDuration = 0.5;
let fabIcon = document.querySelector(".fab-icon");
let menuIcon = document.querySelector(".landing-right-menu-icon");
const handleSocialToggle = () => {
  let nav = document.querySelector(".fab-nav");
  let iconsWrapper = document.querySelector(".fab-nav-icons-wrapper");
  if (isSocialOpen == -1) return;
  if (isSocialOpen) {
    isSocialOpen = -1;
    let templateBrowserPath = document
      .getElementById("template-browser-path")
      .innerHTML.trim();
    fabIcon.innerHTML = `<img src="https://custpostimages.s3.ap-south-1.amazonaws.com/5876/1613798237528.png" id="fab-img-icon" alt="fab-icon">`;
    nav.style.width = 0;
    nav.style.paddingRight = 0;
    iconsWrapper.style.display = "none";
    setTimeout(() => {
      isSocialOpen = 0;
    }, animationDuration * 1000);
  } else {
    isSocialOpen = -1;
    nav.style.width = "80%";
    fabIcon.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    nav.style.paddingRight = "2em";
    setTimeout(() => {
      iconsWrapper.style.display = "flex";
      isSocialOpen = 1;
    }, animationDuration * 1000);
  }
};

const handleMenuToggle = () => {
  let menuList = document.querySelector(".landing-right-menu-list");
  if (isMenuOpen == -1) return;
  let xIcon = menuIcon.querySelector("i");
  if (isMenuOpen) {
    isMenuOpen = -1;
    menuIcon.style.backgroundColor = "transparent";
    xIcon.style.transform = "none";
    menuList.style.height = 0;
    menuList.style.padding = 0;
    setTimeout(() => {
      isMenuOpen = 0;
    }, animationDuration * 1000);
  } else {
    isMenuOpen = -1;
    menuIcon.style.backgroundColor = "#959695";
    xIcon.style.transform = "rotate(-45deg)";
    menuList.style.height = "40vh";
    menuList.style.padding = "1.5em";
    setTimeout(() => {
      isMenuOpen = 1;
    }, animationDuration * 1000);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let icons = document.querySelectorAll(".fab-nav-icon");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let iconName = icon.getAttribute("data-icon");
      window.open(socialLinks[iconName], "_blank");
    });
  });
  fabIcon.addEventListener("click", handleSocialToggle);
  menuIcon.addEventListener("click", handleMenuToggle);
});

function mobileAndTabletCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
