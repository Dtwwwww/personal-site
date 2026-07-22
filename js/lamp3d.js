/* ============================================================
   lamp3d.js — Three.js 物理吊灯（ES Module）
   参考 jinruozai/HTML-Light-Demo：Verlet 钟摆 + 可拖拽拉灯 +
   光色切换。本模块只负责"吊灯与光"的 3D 呈现；页面内容的
   照亮仍由 CSS mask 完成 —— 每帧把光锥落点投影回屏幕坐标，
   通过 window.__setLight(x, y) 驱动 --mx/--my。

   加载失败（无 WebGL / file:// 协议无法加载模块）时静默退出，
   main.js 会在超时后回退到 SVG 吊灯 + 鼠标跟随方案。
   ============================================================ */
import * as THREE from "three";

/* 灯光色板（沿用参考 demo 的预设） */
const COLOR_PRESETS = ["#ffb36b", "#ffd9a3", "#8fdcff", "#c79cff", "#ff5f7f"];

const GRAVITY = -9.8;
const DAMPING = 0.99;         // 每帧速度保留比例，越小停得越快
const CONSTRAINT_ITERS = 3;   // Verlet 约束迭代次数
const CORD_LEN = 1;         // 灯绳长度（世界单位）
const BEAM_LEN = 3.2;         // 光锥长度
const BEAM_ANGLE = (34 * Math.PI) / 180; // 光束角（对齐 demo 的 34°）
const HIT_RADIUS_PX = 90;     // 灯泡的屏幕拖拽命中半径

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/* 生成灯泡光晕的径向渐变贴图 */
function makeGlowTexture(hex) {
  const size = 200;
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const ctx = cv.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, hex);
  g.addColorStop(0.35, hex + "66");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(cv);
}

function init() {
  const canvas = document.getElementById("lampCanvas");
  if (!canvas || !webglAvailable() || typeof window.__setLamp !== "function") return;

  /* ---------- 渲染器 / 场景 / 相机 ---------- */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 10);

  // z=0 平面的可视高度/宽度，用于把吊灯锚定在屏幕顶边正中
  const viewHeight = () => 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const anchor = new THREE.Vector3(0, viewHeight() / 2, 0);

  /* ---------- 材质与网格 ---------- */
  let colorIndex = 0;
  const currentColor = () => new THREE.Color(COLOR_PRESETS[colorIndex]);

  scene.add(new THREE.AmbientLight(0x8890a0, 0.6));

  // 灯绳（每帧更新两端点）
  const cordMat = new THREE.LineBasicMaterial({ color: 0x3a3a42 });
  const cord = new THREE.Line(new THREE.BufferGeometry(), cordMat);
  scene.add(cord);

  // 吊灯组：原点位于灯罩顶端（即绳末端），-Y 沿绳指向下方
  const lamp = new THREE.Group();
  scene.add(lamp);

  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.34, 0.42, 32, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x23232b, roughness: 0.55, metalness: 0.3, side: THREE.DoubleSide })
  );
  shade.position.y = -0.1;
  lamp.add(shade);

  const bulbMat = new THREE.MeshBasicMaterial({ color: currentColor() });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 16), bulbMat);
  bulb.position.y = -0.36;
  lamp.add(bulb);

  // 灯泡光晕
  const glowMat = new THREE.SpriteMaterial({
    map: makeGlowTexture(COLOR_PRESETS[0]),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
  });
  const glow = new THREE.Sprite(glowMat);
  glow.scale.setScalar(1.1);
  glow.position.y = -0.36;
  lamp.add(glow);

  // 体积光锥：双层叠加出渐晕感，顶点在灯泡处向下张开
  const beamRadius = Math.tan(BEAM_ANGLE / 2) * BEAM_LEN;
  const coneGeo = new THREE.ConeGeometry(beamRadius, BEAM_LEN, 48, 1, true);
  coneGeo.translate(0, -BEAM_LEN / 2, 0); // 顶点移到原点，向 -Y 张开
  const beamMatOuter = new THREE.MeshBasicMaterial({
    color: currentColor(), transparent: true, opacity: 0.045,
    blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
  });
  const beamMatInner = new THREE.MeshBasicMaterial({
    color: currentColor(), transparent: true, opacity: 0.07,
    blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
  });
  const beamOuter = new THREE.Mesh(coneGeo, beamMatOuter);
  const beamInner = new THREE.Mesh(coneGeo.clone().scale(0.6, 1, 0.6), beamMatInner);
  beamOuter.position.y = beamInner.position.y = -0.36;
  lamp.add(beamOuter, beamInner);

  // 聚光灯（为灯罩/场景提供真实明暗）
  const spot = new THREE.SpotLight(currentColor(), 30, 0, BEAM_ANGLE / 2, 0.6, 1.2);
  const spotTarget = new THREE.Object3D();
  scene.add(spot, spotTarget);
  spot.target = spotTarget;

  function applyColor() {
    const c = currentColor();
    bulbMat.color.copy(c);
    beamMatOuter.color.copy(c);
    beamMatInner.color.copy(c);
    spot.color.copy(c);
    glowMat.map = makeGlowTexture(COLOR_PRESETS[colorIndex]);
    glowMat.needsUpdate = true;
  }

  /* ---------- Verlet 钟摆 ---------- */
  // 初始给一个水平偏移，页面打开时吊灯自然摆入 —— 配合"开灯"叙事
  const pos = anchor.clone().add(new THREE.Vector3(1.4, -1.0, 0)).sub(anchor).setLength(CORD_LEN).add(anchor);
  const prev = pos.clone();

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const dragPoint = new THREE.Vector3();
  let dragging = false;
  let downAt = null;

  /** 灯泡当前的屏幕坐标（用于命中检测与光照联动） */
  const bulbWorld = new THREE.Vector3();
  function bulbScreen() {
    bulb.getWorldPosition(bulbWorld);
    const v = bulbWorld.clone().project(camera);
    return { x: (v.x * 0.5 + 0.5) * window.innerWidth, y: (-v.y * 0.5 + 0.5) * window.innerHeight };
  }

  function setNdc(e) {
    ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  }

  window.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    const s = bulbScreen();
    if (Math.hypot(e.clientX - s.x, e.clientY - s.y) > HIT_RADIUS_PX) return;
    e.preventDefault();
    document.body.dataset.lampDragging = "1";
    dragging = true;
    downAt = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    e.preventDefault();
    setNdc(e);
    raycaster.setFromCamera(ndc, camera);
    if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
      // 手电式拉灯：位置吸附到指针，但始终约束在绳长圆周上
      dragPoint.sub(anchor).setLength(CORD_LEN).add(anchor);
      const delta = dragPoint.clone().sub(pos);
      pos.copy(dragPoint);
      prev.copy(pos);
    }
  });

  window.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    delete document.body.dataset.lampDragging;
    dragging = false;
    // 几乎没移动的"点按" → 切换光色
    if (downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) < 6) {
      colorIndex = (colorIndex + 1) % COLOR_PRESETS.length;
      applyColor();
    }
    downAt = null;
  });

  window.addEventListener("dblclick", () => {
    pos.copy(anchor).add(new THREE.Vector3(0, -CORD_LEN, 0));
    prev.copy(pos);
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    anchor.y = viewHeight() / 2;
  });

  /* ---------- 主循环 ---------- */
  const downAxis = new THREE.Vector3(0, -1, 0);
  const dir = new THREE.Vector3();
  const clock = new THREE.Clock();

  function tick() {
    const dt = Math.min(clock.getDelta(), 1 / 30);

    if (!dragging) {
      // Verlet 积分
      const vx = (pos.x - prev.x) * DAMPING;
      const vy = (pos.y - prev.y) * DAMPING;
      prev.copy(pos);
      pos.x += vx;
      pos.y += vy + GRAVITY * dt * dt;
      // 约束：始终挂在绳长圆周上
      for (let i = 0; i < CONSTRAINT_ITERS; i++) {
        dir.copy(pos).sub(anchor);
        const d = dir.length() || 1e-6;
        pos.copy(anchor).addScaledVector(dir, CORD_LEN / d);
      }
    }

    // 吊灯姿态：-Y 轴对齐"锚点→灯泡"方向
    dir.copy(pos).sub(anchor).normalize();
    lamp.position.copy(pos);
    lamp.quaternion.setFromUnitVectors(downAxis, dir);

    // 灯绳两端点
    cord.geometry.setFromPoints([anchor, pos]);

    // 聚光灯跟随
    spot.position.copy(pos);
    spotTarget.position.copy(pos).addScaledVector(dir, 4);

    // 光照联动：光锥落点（灯泡沿照射方向外延）投影回屏幕 → 驱动 CSS mask
    bulb.getWorldPosition(bulbWorld);
    const landing = bulbWorld.clone().addScaledVector(dir, BEAM_LEN * 0.85);
    const v = landing.project(camera);
    window.__setLamp(
      (v.x * 0.5 + 0.5) * window.innerWidth,
      (-v.y * 0.5 + 0.5) * window.innerHeight
    );

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  canvas.hidden = false;
  tick();
  // 通知 main.js：3D 吊灯就绪，无需回退方案
  window.dispatchEvent(new Event("lamp3d:ready"));
}

init();
