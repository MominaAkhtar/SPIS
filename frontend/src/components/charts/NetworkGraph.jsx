import React, { useState } from 'react';

/**
 * SPIS NetworkGraph Component
 * Reusable network graph visualization component supporting:
 * - Clustered communities (A, B, C, D, E)
 * - Inter-community bridge nodes with halos and cross-cluster edges
 * - Interactive node hover tooltips
 * - Configurable legend, dimensions, and custom node/link datasets
 */

// Default high-fidelity network topology matching the SPIS design reference
const DEFAULT_COMMUNITIES = [
  { id: 'comm_a', name: 'Community A', color: '#2ECC71', cx: 210, cy: 145 },
  { id: 'comm_b', name: 'Community B', color: '#AF7AC5', cx: 520, cy: 135 },
  { id: 'comm_c', name: 'Community C', color: '#F39C12', cx: 225, cy: 310 },
  { id: 'comm_d', name: 'Community D', color: '#3498DB', cx: 535, cy: 280 },
  { id: 'comm_e', name: 'Community E', color: '#E91E63', cx: 395, cy: 235 },
];

// Precomputed stable node positions for a crisp, organic layout
const generateDefaultGraph = () => {
  const nodes = [];
  const links = [];

  // Community A nodes (Green)
  const aOffsets = [
    [-65, -35], [-45, -55], [-20, -40], [10, -60], [-55, -10],
    [-35, -20], [-10, -25], [15, -35], [35, -45], [-70, 15],
    [-40, 5], [-15, 0], [10, -5], [30, -15], [55, -25],
    [-50, 30], [-25, 25], [0, 20], [25, 10], [50, 0],
    [-35, 45], [-10, 40], [15, 30], [40, 25], [65, 15],
  ];
  aOffsets.forEach(([dx, dy], i) => {
    nodes.push({
      id: `a_${i}`,
      community: 'Community A',
      color: '#2ECC71',
      x: 210 + dx,
      y: 145 + dy,
      size: i % 4 === 0 ? 4 : 3,
      isBridge: false,
    });
  });

  // Community B nodes (Purple)
  const bOffsets = [
    [-55, -30], [-30, -50], [0, -55], [30, -45], [55, -30],
    [-45, -15], [-20, -25], [5, -30], [25, -20], [50, -10],
    [-50, 10], [-25, 0], [0, -5], [25, 5], [45, 15],
    [-40, 30], [-15, 20], [10, 15], [35, 25], [55, 35],
    [-25, 45], [0, 35], [20, 40], [-60, -5], [60, 5],
  ];
  bOffsets.forEach(([dx, dy], i) => {
    nodes.push({
      id: `b_${i}`,
      community: 'Community B',
      color: '#AF7AC5',
      x: 520 + dx,
      y: 135 + dy,
      size: i % 4 === 0 ? 4 : 3,
      isBridge: false,
    });
  });

  // Community C nodes (Orange)
  const cOffsets = [
    [-50, -35], [-25, -40], [0, -30], [25, -45],
    [-55, -10], [-30, -15], [-5, -10], [20, -15], [45, -20],
    [-45, 15], [-20, 10], [5, 5], [30, 10], [55, 5],
    [-35, 35], [-10, 30], [15, 25], [40, 30],
    [-15, 50], [10, 45], [-55, 5], [50, 25],
  ];
  cOffsets.forEach(([dx, dy], i) => {
    nodes.push({
      id: `c_${i}`,
      community: 'Community C',
      color: '#F39C12',
      x: 225 + dx,
      y: 310 + dy,
      size: i % 4 === 0 ? 4 : 3,
      isBridge: false,
    });
  });

  // Community D nodes (Blue)
  const dOffsets = [
    [-45, -30], [-20, -40], [10, -45], [35, -35], [55, -20],
    [-50, -5], [-25, -15], [0, -20], [25, -10], [50, 5],
    [-40, 15], [-15, 5], [10, 0], [35, 15], [55, 25],
    [-30, 35], [-5, 25], [20, 20], [45, 35],
    [-15, 50], [15, 45], [30, 50],
  ];
  dOffsets.forEach(([dx, dy], i) => {
    nodes.push({
      id: `d_${i}`,
      community: 'Community D',
      color: '#3498DB',
      x: 535 + dx,
      y: 280 + dy,
      size: i % 4 === 0 ? 4 : 3,
      isBridge: false,
    });
  });

  // Community E nodes (Pink)
  const eOffsets = [
    [-35, -25], [-10, -30], [15, -25],
    [-30, -5], [-5, -10], [20, -5], [35, 10],
    [-25, 15], [0, 10], [25, 15],
    [-15, 30], [10, 25],
  ];
  eOffsets.forEach(([dx, dy], i) => {
    nodes.push({
      id: `e_${i}`,
      community: 'Community E',
      color: '#E91E63',
      x: 395 + dx,
      y: 235 + dy,
      size: i % 3 === 0 ? 4 : 3,
      isBridge: false,
    });
  });

  // Intra-cluster links (closest neighbor connections)
  ['a', 'b', 'c', 'd', 'e'].forEach((prefix) => {
    const commNodes = nodes.filter((n) => n.id.startsWith(`${prefix}_`));
    for (let i = 0; i < commNodes.length; i++) {
      for (let j = i + 1; j < commNodes.length; j++) {
        const dist = Math.hypot(
          commNodes[i].x - commNodes[j].x,
          commNodes[i].y - commNodes[j].y
        );
        if (dist < 46) {
          links.push({
            source: commNodes[i].id,
            target: commNodes[j].id,
            x1: commNodes[i].x,
            y1: commNodes[i].y,
            x2: commNodes[j].x,
            y2: commNodes[j].y,
            color: commNodes[i].color,
            opacity: 0.22,
            isBridgeLink: false,
          });
        }
      }
    }
  });

  // Explicit Bridge Users connecting multiple communities
  const bridgeUsers = [
    {
      id: 'bridge_ayesha',
      name: '@Ayesha_K',
      community: 'Bridge (A, B, E)',
      score: 0.92,
      x: 350,
      y: 165,
      targets: ['a_14', 'b_1', 'e_1', 'e_4'],
    },
    {
      id: 'bridge_rehman',
      name: '@rehman_voice',
      community: 'Bridge (B, E)',
      score: 0.89,
      x: 445,
      y: 175,
      targets: ['b_6', 'b_11', 'e_2', 'e_6'],
    },
    {
      id: 'bridge_neutral',
      name: '@neutral_view',
      community: 'Bridge (A, C, E)',
      score: 0.85,
      x: 300,
      y: 235,
      targets: ['a_21', 'c_3', 'e_3'],
    },
    {
      id: 'bridge_facts',
      name: '@facts_over_bias',
      community: 'Bridge (E, D)',
      score: 0.78,
      x: 460,
      y: 245,
      targets: ['e_6', 'd_0', 'd_6'],
    },
    {
      id: 'bridge_common',
      name: '@common_ground',
      community: 'Bridge (C, E, D)',
      score: 0.74,
      x: 375,
      y: 295,
      targets: ['c_12', 'e_8', 'd_11'],
    },
    {
      id: 'bridge_dialogue',
      name: '@dialogue_maker',
      community: 'Bridge (A, E)',
      score: 0.70,
      x: 295,
      y: 180,
      targets: ['a_19', 'e_0'],
    },
    {
      id: 'bridge_openmind',
      name: '@open_mind99',
      community: 'Bridge (B, D)',
      score: 0.62,
      x: 490,
      y: 215,
      targets: ['b_16', 'd_1'],
    },
  ];

  bridgeUsers.forEach((bu) => {
    nodes.push({
      id: bu.id,
      name: bu.name,
      community: bu.community,
      score: bu.score,
      color: '#00BFA5',
      x: bu.x,
      y: bu.y,
      size: 5,
      isBridge: true,
    });

    bu.targets.forEach((tgtId) => {
      const tgtNode = nodes.find((n) => n.id === tgtId);
      if (tgtNode) {
        links.push({
          source: bu.id,
          target: tgtId,
          x1: bu.x,
          y1: bu.y,
          x2: tgtNode.x,
          y2: tgtNode.y,
          color: '#00BFA5',
          opacity: 0.45,
          isBridgeLink: true,
        });
      }
    });
  });

  return { nodes, links };
};

export default function NetworkGraph({
  nodes: customNodes,
  links: customLinks,
  communities = DEFAULT_COMMUNITIES,
  height = 420,
  fill = false, // when true the canvas stretches to fill its parent's height (no bottom gap)
  showLegend = true,
  onNodeClick,
  className = '',
}) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const defaultData = React.useMemo(() => generateDefaultGraph(), []);
  const nodes = customNodes && customNodes.length > 0 ? customNodes : defaultData.nodes;
  const links = customLinks && customLinks.length > 0 ? customLinks : defaultData.links;

  return (
    <div className={`relative w-full flex flex-col select-none ${fill ? 'h-full flex-1 min-h-0' : ''} ${className}`}>
      {/* Network Graph SVG Canvas */}
      <div
        className={`w-full relative overflow-hidden rounded-lg bg-[#15181C] ${fill ? 'flex-1 min-h-[340px]' : ''}`}
        style={fill ? undefined : { height }}
      >
        <svg
          viewBox="60 30 600 380"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          {/* Subtle grid pattern background */}
          <defs>
            <filter id="bridgeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>


          {/* Network Links */}
          <g className="edges">
            {links.map((link, idx) => {
              const isHighlighted =
                hoveredNode &&
                (hoveredNode.id === link.source || hoveredNode.id === link.target);

              return (
                <line
                  key={`link-${idx}`}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke={isHighlighted ? '#00BFA5' : link.color}
                  strokeWidth={isHighlighted ? 1.8 : link.isBridgeLink ? 1.2 : 0.8}
                  strokeOpacity={isHighlighted ? 0.9 : link.opacity}
                  strokeDasharray={link.isBridgeLink ? '3 2' : 'none'}
                />
              );
            })}
          </g>

        

          {/* Network Nodes */}
          <g className="nodes">
            {nodes.map((node) => {
              const isHovered = hoveredNode?.id === node.id;

              if (node.isBridge) {
                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => onNodeClick?.(node)}
                  >
                    {/* Outer glowing aura */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isHovered ? 12 : 8}
                      fill="#00BFA5"
                      fillOpacity={isHovered ? 0.45 : 0.25}
                      filter="url(#bridgeGlow)"
                    />
                    {/* Inner core */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isHovered ? 5.5 : 4}
                      fill="#FFFFFF"
                      stroke="#00BFA5"
                      strokeWidth="1.8"
                    />
                  </g>
                );
              }

              return (
                <circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? 6 : node.size || 3.5}
                  fill={node.color}
                  fillOpacity={isHovered ? 1 : 0.85}
                  stroke={isHovered ? '#FFFFFF' : 'none'}
                  strokeWidth="1.2"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => onNodeClick?.(node)}
                />
              );
            })}
          </g>
        </svg>

        {/* Hover Tooltip */}
        {hoveredNode && (
          <div
            className="absolute z-20 pointer-events-none px-2.5 py-1.5 rounded-lg bg-[#111827] border border-[#1E2638] shadow-xl text-xs text-slate-200"
            style={{
              left: `${Math.min(Math.max(10, ((hoveredNode.x - 60) / 600) * 100), 85)}%`,
              top: `${Math.min(Math.max(10, ((hoveredNode.y - 30) / 380) * 100 - 12), 85)}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="font-semibold text-white flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: hoveredNode.color }}
              />
              <span>{hoveredNode.name || hoveredNode.id}</span>
            </div>
            <div className="text-[10px] text-[#8A94A6] mt-0.5">
              {hoveredNode.isBridge
                ? `Bridge Score: ${hoveredNode.score || '0.85'}`
                : hoveredNode.community}
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer matching screenshot */}
      {showLegend && (
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-4 pb-1 text-xs text-[#8A94A6]">
          {communities.map((comm) => (
            <div key={comm.id} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: comm.color }}
              />
              <span className="text-[11px] font-medium">{comm.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center flex-shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#00BFA5] opacity-50 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFFFFF] border border-[#00BFA5]" />
            </span>
            <span className="text-[11px] font-medium text-slate-300">Bridge User</span>
          </div>
        </div>
      )}
    </div>
  );
}
