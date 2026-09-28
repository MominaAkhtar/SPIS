import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Lock, Unlock, RotateCcw } from 'lucide-react';

/**
 * SPIS NetworkGraph Component
 * Real canvas-based force-directed graph with community clusters, nodes, edges, labels and legend.
 * Community colors: A=#2ECC71, B=#AF7AC5, C=#F39C12, D=#3498DB, E=#E91E63
 */

const COMMUNITY_COLORS = {
  A: '#2ECC71',
  B: '#AF7AC5',
  C: '#F39C12',
  D: '#3498DB',
  E: '#E91E63',
};

const BRIDGE_COLOR = '#FFFFFF';
const EDGE_COLOR = 'rgba(255,255,255,0.12)';
const BG_COLOR = '#0B0F19';

function generateGraphData() {
  const nodes = [];
  const links = [];

  // Community centers (relative, will be scaled to canvas)
  const centers = {
    A: { x: 0.28, y: 0.28 },
    B: { x: 0.62, y: 0.22 },
    C: { x: 0.22, y: 0.70 },
    D: { x: 0.65, y: 0.58 },
    E: { x: 0.46, y: 0.48 },
  };

  const counts = { A: 22, B: 20, C: 18, D: 16, E: 8 };

  Object.entries(counts).forEach(([community, count]) => {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI + Math.random() * 0.5;
      const radius = 0.06 + Math.random() * 0.06;
      const cx = centers[community].x;
      const cy = centers[community].y;
      nodes.push({
        id: `${community}-${i}`,
        community,
        isBridge: false,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        size: i === 0 ? 7 : 3 + Math.random() * 3,
      });
    }
  });

  // Bridge users
  const bridgePositions = [
    { x: 0.44, y: 0.34 },
    { x: 0.53, y: 0.45 },
    { x: 0.38, y: 0.50 },
    { x: 0.57, y: 0.30 },
  ];
  bridgePositions.forEach((pos, i) => {
    nodes.push({
      id: `bridge-${i}`,
      community: 'bridge',
      isBridge: true,
      x: pos.x,
      y: pos.y,
      vx: 0,
      vy: 0,
      size: 5,
    });
  });

  // Intra-community edges
  Object.entries(counts).forEach(([community, count]) => {
    const communityNodes = nodes.filter((n) => n.community === community);
    for (let i = 0; i < count - 1; i++) {
      const a = communityNodes[i];
      const b = communityNodes[Math.floor(Math.random() * communityNodes.length)];
      if (a.id !== b.id) {
        links.push({ source: a.id, target: b.id });
      }
    }
    // Extra edges for density
    for (let i = 0; i < Math.floor(count * 0.6); i++) {
      const a = communityNodes[Math.floor(Math.random() * communityNodes.length)];
      const b = communityNodes[Math.floor(Math.random() * communityNodes.length)];
      if (a.id !== b.id) {
        links.push({ source: a.id, target: b.id });
      }
    }
  });

  // Bridge edges crossing communities
  const bridgeNodes = nodes.filter((n) => n.isBridge);
  const bridgePairs = [
    ['A', 'B'], ['B', 'C'], ['A', 'D'], ['C', 'D'], ['B', 'E'],
  ];
  bridgeNodes.forEach((bridge, i) => {
    const pair = bridgePairs[i % bridgePairs.length];
    const srcCom = nodes.filter((n) => n.community === pair[0]);
    const dstCom = nodes.filter((n) => n.community === pair[1]);
    if (srcCom.length && dstCom.length) {
      links.push({ source: bridge.id, target: srcCom[0].id });
      links.push({ source: bridge.id, target: dstCom[0].id });
      // Additional connections
      if (srcCom.length > 1) links.push({ source: bridge.id, target: srcCom[1].id });
      if (dstCom.length > 1) links.push({ source: bridge.id, target: dstCom[1].id });
    }
  });

  return { nodes, links };
}

function runForceSimulation(nodes, links, width, height, iterations = 200) {
  // Convert to working coords
  const nodeMap = {};
  const simNodes = nodes.map((n) => {
    const node = {
      ...n,
      x: n.x * width,
      y: n.y * height,
      vx: 0,
      vy: 0,
    };
    nodeMap[n.id] = node;
    return node;
  });

  const simLinks = links
    .map((l) => ({
      source: nodeMap[l.source],
      target: nodeMap[l.target],
    }))
    .filter((l) => l.source && l.target);

  const alpha = 0.3;
  const damping = 0.85;
  const repulsion = 900;
  const attraction = 0.04;
  const centerStrength = 0.015;

  for (let iter = 0; iter < iterations; iter++) {
    const a = alpha * (1 - iter / iterations);

    // Repulsion between all node pairs
    for (let i = 0; i < simNodes.length; i++) {
      for (let j = i + 1; j < simNodes.length; j++) {
        const dx = simNodes[j].x - simNodes[i].x;
        const dy = simNodes[j].y - simNodes[i].y;
        const dist2 = dx * dx + dy * dy + 1;
        const dist = Math.sqrt(dist2);
        const force = (repulsion * a) / dist2;
        simNodes[i].vx -= (force * dx) / dist;
        simNodes[i].vy -= (force * dy) / dist;
        simNodes[j].vx += (force * dx) / dist;
        simNodes[j].vy += (force * dy) / dist;
      }
    }

    // Attraction along edges
    simLinks.forEach((link) => {
      const dx = link.target.x - link.source.x;
      const dy = link.target.y - link.source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const idealLen = link.source.community === link.target.community ? 60 : 150;
      const force = ((dist - idealLen) * attraction * a) / dist;
      link.source.vx += force * dx;
      link.source.vy += force * dy;
      link.target.vx -= force * dx;
      link.target.vy -= force * dy;
    });

    // Center gravity
    simNodes.forEach((n) => {
      n.vx += (width / 2 - n.x) * centerStrength * a;
      n.vy += (height / 2 - n.y) * centerStrength * a;
    });

    // Apply velocities
    simNodes.forEach((n) => {
      n.vx *= damping;
      n.vy *= damping;
      n.x += n.vx;
      n.y += n.vy;
      // Clamp
      n.x = Math.max(20, Math.min(width - 20, n.x));
      n.y = Math.max(20, Math.min(height - 20, n.y));
    });
  }

  return { simNodes, simLinks };
}

export default function NetworkGraph({
  nodes: propNodes,
  links: propLinks,
  height = 350,
  className = '',
  filter = 'All Interactions',
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [locked, setLocked] = useState(false);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Build graph data once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth || 600;
    const h = height;
    canvas.width = w;
    canvas.height = h;

    const { nodes, links } = generateGraphData();
    const { simNodes, simLinks } = runForceSimulation(nodes, links, w, h, 300);
    stateRef.current = { simNodes, simLinks, w, h };
    setReady(true);
  }, [height]);

  // Draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const ctx = canvas.getContext('2d');
    const { simNodes, simLinks, w, h } = stateRef.current;
    const z = zoomRef.current;
    const p = panRef.current;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.scale(z, z);

    // Draw edges
    simLinks.forEach((link) => {
      const s = link.source;
      const t = link.target;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);
      ctx.strokeStyle = EDGE_COLOR;
      ctx.lineWidth = 0.8 / z;
      ctx.stroke();
    });

    // Draw nodes
    simNodes.forEach((node) => {
      const color = node.isBridge
        ? BRIDGE_COLOR
        : COMMUNITY_COLORS[node.community] || '#888';

      // Outer glow
      if (node.size >= 5) {
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2.5);
        grad.addColorStop(0, color + '55');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Bridge ring
      if (node.isBridge) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + 2, 0, Math.PI * 2);
        ctx.strokeStyle = BRIDGE_COLOR;
        ctx.lineWidth = 1 / z;
        ctx.stroke();
      }
    });

    // Community labels — small, light, non-overlapping
    const labelOffsets = {
      A: { dx: 0, dy: -42 },
      B: { dx: 0, dy: -42 },
      C: { dx: 0, dy: 44 },
      D: { dx: 0, dy: 44 },
      E: { dx: 0, dy: -40 },
    };

    Object.entries(COMMUNITY_COLORS).forEach(([com, color]) => {
      const comNodes = simNodes.filter((n) => n.community === com);
      if (!comNodes.length) return;
      const cx = comNodes.reduce((s, n) => s + n.x, 0) / comNodes.length;
      const cy = comNodes.reduce((s, n) => s + n.y, 0) / comNodes.length;
      const off = labelOffsets[com] || { dx: 0, dy: -42 };

      ctx.font = `500 ${9 / z}px Inter, system-ui, sans-serif`;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.65;
      ctx.textAlign = 'center';
      ctx.fillText(`Community ${com}`, cx + off.dx, cy + off.dy);
      ctx.globalAlpha = 1;
    });

    ctx.restore();
  }, []);

  // Animate
  useEffect(() => {
    if (!ready) return;
    const loop = () => {
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [ready, draw]);

  // Zoom handlers
  const handleZoomIn = () => {
    zoomRef.current = Math.min(zoomRef.current * 1.3, 5);
    setZoom(zoomRef.current);
  };
  const handleZoomOut = () => {
    zoomRef.current = Math.max(zoomRef.current / 1.3, 0.3);
    setZoom(zoomRef.current);
  };
  const handleReset = () => {
    zoomRef.current = 1;
    panRef.current = { x: 0, y: 0 };
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e) => {
    if (locked) return;
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current || locked) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    panRef.current = { x: panRef.current.x + dx, y: panRef.current.y + dy };
    setPan({ ...panRef.current });
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp = () => { isDragging.current = false; };

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    zoomRef.current = Math.min(Math.max(zoomRef.current * factor, 0.3), 5);
    setZoom(zoomRef.current);
  };

  return (
    <div className={`relative w-full rounded-xl overflow-hidden border border-[#172338] bg-[#0B0F19] ${className}`} style={{ height }} ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: locked ? 'default' : isDragging.current ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Zoom Controls */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <button
          onClick={() => {/* fullscreen */}}
          className="p-1.5 rounded bg-[#111D33]/80 border border-[#223654] text-slate-300 hover:text-white hover:bg-[#162540] transition-colors"
          title="Fit to screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded bg-[#111D33]/80 border border-[#223654] text-slate-300 hover:text-white hover:bg-[#162540] transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded bg-[#111D33]/80 border border-[#223654] text-slate-300 hover:text-white hover:bg-[#162540] transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setLocked((v) => { const next = !v; return next; })}
          className="p-1.5 rounded bg-[#111D33]/80 border border-[#223654] text-slate-300 hover:text-white hover:bg-[#162540] transition-colors"
          title={locked ? 'Unlock pan' : 'Lock pan'}
        >
          {locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-x-4 gap-y-1">
        {Object.entries(COMMUNITY_COLORS).map(([com, color]) => (
          <div key={com} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-slate-300">Community {com}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-white bg-transparent" />
          <span className="text-[10px] text-slate-300">Bridge User</span>
        </div>
      </div>
    </div>
  );
}
