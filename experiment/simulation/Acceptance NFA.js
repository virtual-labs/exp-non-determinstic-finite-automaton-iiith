/*****
 * File containing main logic to display NFA with epsilon transitions only
 */

// Global variables
let width = 800;  // Increased canvas size
let height = 450; // Increased canvas size
let radius = 28;  // Slightly larger nodes

let automata = [];
let automataIndex = 0;
let inputIndex = 0;
let inputPointer = 0;
let nodes = [];
let edges = [];

// --- Epsilon-NFA Data Definitions with Optimal Layouts ---

const enfa1 = {
  description: "ε-NFA: Accepts 'ab' or 'ba' as a substring. (ε creates two parallel paths)",
  vertices: [
    // Main path - center
    { text: "q0", type: "start",  x: 120, y: 225 },
    // 'ab' branch (top) - create a clear upward branch
    { text: "q1", type: "none",   x: 280, y: 120 },
    { text: "q2", type: "none",   x: 450, y: 120 },
    // 'ba' branch (bottom) - create a clear downward branch  
    { text: "q4", type: "none",   x: 280, y: 330 },
    { text: "q5", type: "accept", x: 450, y: 330 },
    // Final accept state - center right
    { text: "q3", type: "accept", x: 600, y: 225 }
  ],
  edges: [
    { start: "q0", end: "q0", text: ["a","b"], type: "self" },
    { start: "q0", end: "q1", text: "ε", type: "forward" }, // ε-choice to 'ab' path
    { start: "q0", end: "q4", text: "ε", type: "forward" }, // ε-choice to 'ba' path
    { start: "q1", end: "q2", text: "a", type: "forward" },
    { start: "q2", end: "q3", text: "b", type: "forward" },
    { start: "q4", end: "q5", text: "b", type: "forward" },
    { start: "q5", end: "q3", text: "a", type: "forward" },
    { start: "q3", end: "q3", text: ["a","b"], type: "self" }
  ],
  input: [
    {
      string: "aabbb",
      states: [
        ["q0", "q1", "q4"], // ε-closure: q0 + ε-moves to q1,q4
        ["q0", "q1", "q4", "q2"], // read 'a': from q0→q0, q1→q2
        ["q0", "q1", "q4", "q2"], // read 'a': q0→q0
        ["q0", "q1", "q4", "q3", "q5"], // read 'b': q2→q3, q0→q0, q4→q5
        ["q0", "q1", "q4", "q3", "q5"], // read 'b': q3→q3, q0→q0
        ["q0", "q1", "q4", "q3", "q5"] // read 'b': q3→q3, q0→q0
      ]
    },
    {
      string: "bbbaaa",
      states: [
        ["q0", "q1", "q4"],
        ["q0", "q1", "q4", "q5"], // read 'b': q0→q0, q4→q5
        ["q0", "q1", "q4", "q5"], // read 'b': q0→q0
        ["q0", "q1", "q4", "q5"], // read 'b': q0→q0
        ["q0", "q1", "q4", "q2", "q3"], // read 'a': q5→q3, q0→q0, q1→q2
        ["q0", "q1", "q4", "q2", "q3"], // read 'a': q3→q3, q0→q0
        ["q0", "q1", "q4", "q2", "q3"] // read 'a': q3→q3, q0→q0
      ]
    },
    {
      string: "aaa",
      states: [
        ["q0", "q1", "q4"],
        ["q0", "q1", "q4", "q2"], // read 'a'
        ["q0", "q1", "q4", "q2"], // read 'a'
        ["q0", "q1", "q4", "q2"] // read 'a' - NOT ACCEPTED (no q3 or q5)
      ]
    }
  ]
};

const enfa2 = {
  description: "ε-NFA: Accepts strings ending with '01' or just '1' (ε-transition creates a shortcut)",
  vertices: [
    // Start state - left center
    { text: "s", type: "start",  x: 120, y: 225 },
    // ε-path branch - create upward branch for epsilon shortcut
    { text: "c", type: "none",   x: 320, y: 140 }, 
    // Regular '0' path - keep in middle/lower
    { text: "a", type: "none",   x: 320, y: 310 }, 
    // Final accept - right center where both paths converge
    { text: "b", type: "accept", x: 520, y: 225 }
  ],
  edges: [
    { start: "s", end: "s", text: ["0", "1"], type: "self" },
    { start: "s", end: "a", text: "0", type: "forward" },
    { start: "s", end: "c", text: "ε", type: "forward" },
    { start: "a", end: "b", text: "1", type: "forward" },
    { start: "c", end: "b", text: "1", type: "forward" }
  ],
  input: [
    {
      string: "10101",
      states: [
        ["s", "c"], // ε-closure
        ["s", "c", "b"], // read '1': s→s, c→b
        ["s", "c", "a"], // read '0': s→s, s→a
        ["s", "c", "b"], // read '1': s→s, c→b, a→b
        ["s", "c", "a"], // read '0': s→s, s→a
        ["s", "c", "b"] // read '1': s→s, c→b, a→b - ACCEPTED
      ]
    },
    {
      string: "0001",
      states: [
        ["s", "c"],
        ["s", "c", "a"], // read '0': s→s, s→a
        ["s", "c", "a"], // read '0': s→s, s→a
        ["s", "c", "a"], // read '0': s→s, s→a
        ["s", "c", "b"] // read '1': s→s, c→b, a→b - ACCEPTED
      ]
    },
    {
      string: "1100",
      states: [
        ["s", "c"],
        ["s", "c", "b"], // read '1'
        ["s", "c", "b"], // read '1'
        ["s", "c", "a"], // read '0'
        ["s", "c", "a"] // read '0' - NOT ACCEPTED (not in b)
      ]
    }
  ]
};

const enfa3 = {
  description: "ε-NFA: Optional middle 'a' - accepts L = {b*ab*} ∪ {b*}",
  vertices: [
    // Start state - left
    { text: "q0", type: "start",  x: 150, y: 225 },
    // Middle state for 'a' - create slight upward curve
    { text: "q1", type: "none",   x: 400, y: 160 },
    // Accept state - right, positioned to show both direct ε-path and via q1
    { text: "q2", type: "accept", x: 650, y: 225 }
  ],
  edges: [
    { start: "q0", end: "q0", text: "b", type: "self" },
    { start: "q2", end: "q2", text: "b", type: "self" },
    { start: "q0", end: "q1", text: "a", type: "forward" },
    { start: "q0", end: "q2", text: "ε", type: "forward" }, // Skips the 'a'
    { start: "q1", end: "q2", text: "ε", type: "forward" }
  ],
  input: [
    {
      string: "bbabbb",
      states: [
        ["q0", "q2"], // ε-closure
        ["q0", "q2"], // read 'b': q0→q0, q2→q2
        ["q0", "q2"], // read 'b': q0→q0, q2→q2
        ["q0", "q2", "q1"], // read 'a': q0→q1, then ε-closure adds q2
        ["q0", "q2"], // read 'b': q2→q2
        ["q0", "q2"], // read 'b': q2→q2
        ["q0", "q2"] // read 'b': q2→q2 - ACCEPTED
      ]
    },
    {
      string: "bbb",
      states: [
        ["q0", "q2"], // ε-closure
        ["q0", "q2"], // read 'b'
        ["q0", "q2"], // read 'b'
        ["q0", "q2"] // read 'b' - ACCEPTED (via ε-path)
      ]
    },
    {
      string: "aaba",
      states: [
        ["q0", "q2"], // ε-closure
        ["q0", "q2", "q1"], // read 'a': q0→q1
        ["q0", "q2", "q1"], // read 'a': q0→q1
        ["q0", "q2"], // read 'b': q2→q2
        ["q0", "q2", "q1"] // read 'a': q0→q1 - ACCEPTED (q2 is accepting)
      ]
    }
  ]
};

const enfa4 = {
  description: "ε-NFA: Accepts strings with substring 'aa' or 'bb' (ε creates parallel monitoring)",
  vertices: [
    // Start state
    { text: "q0", type: "start", x: 120, y: 250 },
    // 'aa' detection path (top)
    { text: "q1", type: "none", x: 300, y: 150 },
    { text: "q2", type: "none", x: 480, y: 150 },
    // 'bb' detection path (bottom)
    { text: "q3", type: "none", x: 300, y: 350 },
    { text: "q4", type: "none", x: 480, y: 350 },
    // Accept state
    { text: "q5", type: "accept", x: 660, y: 250 }
  ],
  edges: [
    { start: "q0", end: "q0", text: ["a", "b"], type: "self" },
    { start: "q0", end: "q1", text: "ε", type: "forward" }, // ε to 'aa' monitor
    { start: "q0", end: "q3", text: "ε", type: "forward" }, // ε to 'bb' monitor
    { start: "q1", end: "q2", text: "a", type: "forward" },
    { start: "q2", end: "q5", text: "a", type: "forward" },
    { start: "q3", end: "q4", text: "b", type: "forward" },
    { start: "q4", end: "q5", text: "b", type: "forward" },
    { start: "q5", end: "q5", text: ["a", "b"], type: "self" }
  ],
  input: [
    {
      string: "abaab",
      states: [
        ["q0", "q1", "q3"], // ε-closure
        ["q0", "q1", "q3", "q2"], // read 'a': q0→q0, q1→q2
        ["q0", "q1", "q3", "q4"], // read 'b': q0→q0, q3→q4
        ["q0", "q1", "q3", "q2"], // read 'a': q0→q0, q1→q2
        ["q0", "q1", "q3", "q2", "q5"], // read 'a': q0→q0, q2→q5
        ["q0", "q1", "q3", "q4", "q5"] // read 'b': q0→q0, q3→q4, q5→q5 - ACCEPTED
      ]
    },
    {
      string: "bbbaa",
      states: [
        ["q0", "q1", "q3"],
        ["q0", "q1", "q3", "q4"], // read 'b': q3→q4
        ["q0", "q1", "q3", "q5"], // read 'b': q4→q5
        ["q0", "q1", "q3", "q4", "q5"], // read 'b': q5→q5, q3→q4
        ["q0", "q1", "q3", "q2", "q5"], // read 'a': q5→q5, q1→q2
        ["q0", "q1", "q3", "q2", "q5"] // read 'a': q5→q5, q2→q5 - ACCEPTED
      ]
    },
    {
      string: "abab",
      states: [
        ["q0", "q1", "q3"],
        ["q0", "q1", "q3", "q2"], // read 'a'
        ["q0", "q1", "q3", "q4"], // read 'b'
        ["q0", "q1", "q3", "q2"], // read 'a'
        ["q0", "q1", "q3", "q4"] // read 'b' - NOT ACCEPTED (no consecutive aa or bb)
      ]
    }
  ]
};

// Update the automata array with all 4 NFAs
automata = [enfa1, enfa2, enfa3, enfa4];

// Helper Functions
function newElementNS(tag, attr) {
  const elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
  attr.forEach(function ([name, value]) {
    elem.setAttribute(name, value);
  });
  return elem;
}

function newElement(tag, attr) {
  const elem = document.createElement(tag);
  attr.forEach(function ([name, value]) {
    elem.setAttribute(name, value);
  });
  return elem;
}

function clearElem(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.lastChild);
  }
}

// Helper function to create curved path (simplified from NFA version)
function createCurvedPath(start, end, curveFactor) {
  if (Math.abs(curveFactor) < 5) {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const mid = {
    x: (start.x + end.x) / 2 + Math.sin(angle) * curveFactor,
    y: (start.y + end.y) / 2 - Math.cos(angle) * curveFactor
  };
  return `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;
}

// Helper Functions
function updateButtonStates() {
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const currentInput = automata[automataIndex]["input"][inputIndex];
  if (!prevBtn || !nextBtn || !currentInput) return;
  const inputStr = currentInput["string"];
  prevBtn.disabled = inputPointer <= 0;
  nextBtn.disabled = inputPointer >= inputStr.length;
  // Add visual feedback for disabled state
  prevBtn.style.opacity = prevBtn.disabled ? 0.5 : 1;
  nextBtn.style.opacity = nextBtn.disabled ? 0.5 : 1;
  prevBtn.style.cursor = prevBtn.disabled ? "not-allowed" : "pointer";
  nextBtn.style.cursor = nextBtn.disabled ? "not-allowed" : "pointer";
}

// Main Display Function (IMPROVED WITH BETTER CENTERING AND CURVES)
function displayCanvas(canvas, nfa, inputPointer, currentStates) {
  clearElem(canvas);
  
  // Minimal arrowhead definition (simplified from DFA code)
  const defs = newElementNS("defs", []);
  const marker = newElementNS("marker", [
    ["id", "arrowhead"], ["markerWidth", "7"], ["markerHeight", "5"],
    ["refX", "6"], ["refY", "2.5"], ["orient", "auto"], ["markerUnits", "strokeWidth"]
  ]);
  const arrowPath = newElementNS("path", [
    ["d", "M0,0 L7,2.5 L0,5 L2,2.5 Z"], ["fill", "#222"], ["stroke", "#222"], ["stroke-width", "0.5"]
  ]);
  marker.appendChild(arrowPath);
  defs.appendChild(marker);
  canvas.appendChild(defs);

  // Get nodes from NFA vertices
  const nodes = nfa.vertices;
  
  // Compute tight bounding box from actual node positions
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  nodes.forEach(n => {
    minX = Math.min(minX, n.x - radius);
    maxX = Math.max(maxX, n.x + radius);
    minY = Math.min(minY, n.y - radius);
    maxY = Math.max(maxY, n.y + radius);
  });

  // Account for self-loops and edge curves in bounding box
  nfa.edges.forEach(e => {
    const startNode = nodes.find(n => n.text === e.start);
    const endNode = nodes.find(n => n.text === e.end);
    
    if (e.type === "self" && startNode) {
      // Account for self-loop extending above the node
      const loopTop = startNode.y - radius - 40; // Self-loop height
      minY = Math.min(minY, loopTop - 15); // Extra space for label
    } else if (startNode && endNode) {
      // Account for curved edges extending beyond straight line
      const midX = (startNode.x + endNode.x) / 2;
      const midY = (startNode.y + endNode.y) / 2;
      const angle = Math.atan2(endNode.y - startNode.y, endNode.x - startNode.x);
      
      // Estimate curve extent (similar to actual curve calculation)
      const isEpsilon = (Array.isArray(e.text) && e.text.includes("ε")) || e.text === "ε";
      const hasReverse = nfa.edges.some(edge => edge.start === e.end && edge.end === e.start);
      const curveFactor = hasReverse ? 30 : (isEpsilon ? 25 : 15);
      
      const curveX = midX + Math.sin(angle) * curveFactor;
      const curveY = midY - Math.cos(angle) * curveFactor;
      
      minX = Math.min(minX, curveX - 20);
      maxX = Math.max(maxX, curveX + 20);
      minY = Math.min(minY, curveY - 20);
      maxY = Math.max(maxY, curveY + 20);
    }
  });
  
  // Account for start arrows
  nodes.filter(n => n.type === "start").forEach(n => {
    minX = Math.min(minX, n.x - radius - 35);
  });

  // Add margins
  const horizontalMargin = 30;
  const verticalMargin = 20;
  minX -= horizontalMargin;
  maxX += horizontalMargin;
  minY -= verticalMargin;
  maxY += verticalMargin;

  // Calculate optimal scaling and centering
  const contentWidth = maxX - minX;
  const contentHeight = maxY - minY;
  const scaleX = width / contentWidth;
  const scaleY = height / contentHeight;
  const scale = Math.min(scaleX, scaleY, 1.0); // Don't scale up
  
  // Center the content
  const tx = (width - contentWidth * scale) / 2 - minX * scale;
  // Move diagram further up by increasing the divisor (e.g., 1.35 instead of 2)
  const ty = (height - contentHeight * scale) / 10 - minY * scale;

  // Create transformation group
  const group = newElementNS("g", [["transform", `translate(${tx},${ty}) scale(${scale})`]]);
  canvas.appendChild(group);

  // --- Draw Edges with Improved Curve Logic ---
  const edgeGroups = {};
  nfa.edges.forEach(e => {
    const key = e.type === "self" ? `self-${e.start}` : `${e.start}->${e.end}`;
    if (!edgeGroups[key]) edgeGroups[key] = [];
    edgeGroups[key].push(e);
  });

  Object.values(edgeGroups).forEach(edgeList => {
    edgeList.forEach((edge, idx) => {
      const startNode = nodes.find(n => n.text === edge.start);
      const endNode = nodes.find(n => n.text === edge.end);
      
      let pathStr = "";
      let labelPos = { x: 0, y: 0 };
      
      if (edge.type === "self") {
        // Simplified self-loop using larger arc and more offset for better arrow visibility
        const x = startNode.x;
        // Increase the offset below the node (was: startNode.y + radius)
        const y = startNode.y + radius + 5; // Add extra 18px offset
        const r = Math.max(12, radius * 0.95); // Slightly larger loop
        pathStr = `M ${x} ${y} A ${r} ${r} 0 1 1 ${x - 0.1} ${y}`;
        // Place label at the bottom of the loop (below the node)
        labelPos = { x: x, y: y + r + 14 };
      } else {
        // Calculate edge start and end points on node circumference
        const angle = Math.atan2(endNode.y - startNode.y, endNode.x - startNode.x);
        const start = {
          x: startNode.x + radius * Math.cos(angle),
          y: startNode.y + radius * Math.sin(angle)
        };
        const end = {
          x: endNode.x - radius * Math.cos(angle),
          y: endNode.y - radius * Math.sin(angle)
        };
        
        // Determine curve amount based on edge properties
        const hasReverse = nfa.edges.some(e => e.start === edge.end && e.end === edge.start);
        const isEpsilon = (Array.isArray(edge.text) && edge.text.includes("ε")) || edge.text === "ε";
        const distance = Math.sqrt(Math.pow(endNode.x - startNode.x, 2) + Math.pow(endNode.y - startNode.y, 2));
        
        let curveFactor = 0;
        if (hasReverse) {
          // Bidirectional edges need strong curves to avoid overlap
          curveFactor = idx % 2 === 0 ? 30 : -30; // Alternate curve direction
        } else if (isEpsilon) {
          curveFactor = 20; // Moderate curve for epsilon transitions
        } else if (distance > 200) {
          curveFactor = 15; // Small curve for distant nodes
        } else {
          curveFactor = 8; // Minimal curve for close nodes
        }
        
        if (Math.abs(curveFactor) < 5) {
          // Straight line for minimal curves
          pathStr = createCurvedPath(start, end, 0);
          labelPos = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
        } else {
          // Curved line using quadratic Bezier
          const angle = Math.atan2(end.y - start.y, end.x - start.x);
          const mid = {
            x: (start.x + end.x) / 2 + Math.sin(angle) * curveFactor,
            y: (start.y + end.y) / 2 - Math.cos(angle) * curveFactor
          };
          pathStr = createCurvedPath(start, end, curveFactor);
          labelPos = { x: mid.x, y: mid.y };
        }
      }
      
      // Draw the edge path
      const isEpsilon = (Array.isArray(edge.text) && edge.text.includes("ε")) || edge.text === "ε";
      const pathElem = newElementNS("path", [
        ["d", pathStr], ["fill", "none"],
        ["stroke", isEpsilon ? "#888" : "#333"], ["stroke-width", "2"],
        ["marker-end", "url(#arrowhead)"], ["opacity", "0.95"]
      ]);
      if (isEpsilon) pathElem.setAttribute("stroke-dasharray", "5,3");
      group.appendChild(pathElem);
      
      // Draw edge label
      const labelStr = Array.isArray(edge.text) ? edge.text.join(", ") : edge.text;
      const edgeLabel = newElementNS("text", [
        ["fill", isEpsilon ? "#555" : "#222"], ["font-family", "Inter, sans-serif"],
        ["font-size", "13"], ["font-weight", "600"], ["text-anchor", "middle"],
        ["dominant-baseline", "middle"], ["x", labelPos.x], ["y", labelPos.y - 8]
      ]);
      edgeLabel.textContent = labelStr;
      group.appendChild(edgeLabel);
    });
  });

  // --- Draw Nodes with Simplified Styling ---
  nodes.forEach(n => {
    const isCurrent = currentStates && currentStates.includes(n.text);
    
    // Node circle with cleaner styling
    let fillColor = "#fff";
    let strokeColor = "#222";
    let strokeWidth = "2";
    
    if (isCurrent) {
      fillColor = "#ffe066"; // Highlight current states
      strokeColor = "#d97706";
      strokeWidth = "3";
    }
    
    const circle = newElementNS("circle", [
      ["cx", n.x], ["cy", n.y], ["r", radius],
      ["stroke", strokeColor], ["fill", fillColor], ["stroke-width", strokeWidth]
    ]);
    group.appendChild(circle);

    // Accept state: double circle (simplified)
    if (n.type === "accept") {
      const inner = newElementNS("circle", [
        ["cx", n.x], ["cy", n.y], ["r", radius - 6],
        ["stroke", strokeColor], ["stroke-width", "1.5"], ["fill", "none"]
      ]);
      group.appendChild(inner);
    }

    // Node label with consistent styling
    const label = newElementNS("text", [
      ["x", n.x], ["y", n.y + 2], ["fill", "#222"], ["text-anchor", "middle"],
      ["dominant-baseline", "middle"], ["font-family", "Inter, sans-serif"],
      ["font-weight", "700"], ["font-size", "16"]
    ]);
    label.textContent = n.text;
    group.appendChild(label);
  });

  // Draw start arrows (simplified approach)
  nodes.filter(n => n.type === "start").forEach(n => {
    const startArrowPath = newElementNS("path", [
      ["d", `M ${n.x - radius - 30},${n.y} L ${n.x - radius - 5},${n.y}`],
      ["stroke", "#d97706"], ["stroke-width", "3"], ["marker-end", "url(#arrowhead)"]
    ]);
    group.appendChild(startArrowPath);
  });
}

// Core Functions (improved refreshCanvas with responsive sizing)
function refreshCanvas() {
    const canvas = document.getElementById("canvas1");
    
    // Use responsive canvas sizing approach from DFA
    const parent = canvas.parentElement;
    let w = parent ? parent.offsetWidth || 800 : 800;
    let h = Math.max(450, Math.round(w / 1.8)); // Maintain good aspect ratio
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    width = w;
    height = h;

    let currentStates = [];
    if (automata[automataIndex] && automata[automataIndex].input[inputIndex]) {
        currentStates = automata[automataIndex].input[inputIndex].states[inputPointer] || [];
    }
    document.getElementById("DFA_description").textContent = automata[automataIndex]?.description || "";
    
    displayCanvas(canvas, automata[automataIndex], inputPointer, currentStates);
    updateButtonStates();
}

function refreshInput() {
  const inputContainer = document.getElementById("input_container");
  clearElem(inputContainer);
  const inputData = automata[automataIndex]["input"][inputIndex];
  if (!inputData) return; // Safeguard if inputData is undefined
  const inputStr = inputData["string"];

  for (let i = 0; i < inputStr.length; ++i) {
    let className = "input-char font-bold text-black transition-all";
    if (inputPointer === i) {
      className += " bg-yellow-200 rounded scale-110";
    }
    const span = document.createElement("span");
    span.id = `text_${i}`;
    span.className = className;
    span.textContent = inputStr[i];
    inputContainer.appendChild(span);
    if (i < inputStr.length - 1) {
      inputContainer.appendChild(document.createTextNode(" "));
    }
  }
  // Show "ε" for empty string or initial state
  if (inputStr.length === 0 && inputPointer === 0) {
    const span = document.createElement("span");
    span.className = "input-char font-bold text-black bg-yellow-200 rounded scale-110";
    span.textContent = "ε (start)";
    inputContainer.appendChild(span);
  }
  updateButtonStates();
}

function resetStack() {
  const stack = document.getElementById("trace_list"); // Changed id to trace_list for clarity
  if (stack) {
    clearElem(stack); // Use clearElem helper
  }
  // Add initial state to stack
  const initialStates = automata[automataIndex]["input"][inputIndex]["states"][0];
  addToStack(`Step 0: Initial states: {${initialStates.join(', ')}}`);
}

function addToStack(str) {
  const stack = document.getElementById("trace_list");
  if (!stack) return;

  // Un-bold any currently bold item
  Array.from(stack.children).forEach(li => {
    li.style.fontWeight = "normal";
  });

  const listElem = document.createElement("li");
  listElem.textContent = str;
  listElem.style.fontWeight = "bold"; // Make new item bold

  stack.prepend(listElem); // Add new trace at the top
}

function removeFromStack() {
  const stack = document.getElementById("trace_list");
  if (!stack || stack.children.length === 0) return;

  stack.removeChild(stack.firstElementChild); // Remove the top (most recent) element

  // If there are still elements, bold the new top one
  if (stack.firstElementChild) {
    stack.firstElementChild.style.fontWeight = "bold";
  }
}


// Event Handlers (updated for NFA)
window.addEventListener('load', function (e) {
  refreshInput();
  refreshCanvas();
  resetStack(); // Call resetStack on initial load
  updateButtonStates();

  document.getElementById("change_dfa").addEventListener("click", function () {
    automataIndex = (automataIndex + 1) % automata.length;
    inputIndex = 0; // Reset input when changing DFA
    inputPointer = 0; // Reset pointer
    refreshInput();
    refreshCanvas();
    resetStack();
    updateButtonStates();
  });

  document.getElementById("next").addEventListener("click", function () {
    const currentInput = automata[automataIndex]["input"][inputIndex];
    if (!currentInput) return; // Safeguard

    const inputStr = currentInput["string"];
    if (inputPointer < inputStr.length) {
      inputPointer++; // Move to next character
      refreshInput();
      refreshCanvas();

      let traceMsg = "";
      const statesAtThisStep = currentInput["states"][inputPointer];

      if (inputPointer === 0) { // This case should theoretically be handled by resetStack, but good for robustness
        traceMsg = `Step 0: Initial states: {${statesAtThisStep.join(', ')}}`;
      } else {
        const charRead = inputStr[inputPointer - 1]; // Character just read
        traceMsg = `Step ${inputPointer}: Read '${charRead}' -> States: {${statesAtThisStep.join(', ')}}`;
      }
      addToStack(traceMsg);

      // Check for acceptance after processing the last character
      if (inputPointer === inputStr.length) {
        const finalStates = statesAtThisStep;
        let isAccepted = false;
        for (let stateText of finalStates) {
          const vertex = automata[automataIndex]["vertices"].find(v => v.text === stateText);
          if (vertex && vertex.type === "accept") {
            isAccepted = true;
            break;
          }
        }
        swal({
          title: isAccepted ? "🎉 Accepted!" : "❌ Rejected!",
          text: `The input "${inputStr}" was ${isAccepted ? 'accepted' : 'rejected'}.`,
          icon: isAccepted ? "success" : "error",
          button: "Continue"
        });
      }
    }
    updateButtonStates();
  });

  document.getElementById("prev").addEventListener("click", function () {
    if (inputPointer > 0) {
      inputPointer--;
      refreshInput();
      refreshCanvas();
      removeFromStack();
      updateButtonStates();
    }
  });

  // Event listener for changing input string via dropdown/select
  document.getElementById("change_input").addEventListener("click", function () {
    // This button might trigger a modal or a separate UI to select input
    // For now, let's just cycle through inputs for the current NFA
    const currentNFAInputs = automata[automataIndex]["input"];
    inputIndex = (inputIndex + 1) % currentNFAInputs.length;
    inputPointer = 0; // Reset pointer for the new input string
    refreshInput();
    refreshCanvas();
    resetStack(); // Reset trace stack for the new input
    updateButtonStates();
  });

  // Add responsive canvas resize functionality
  function resizeNfaCanvas() {
    const canvas = document.getElementById("canvas1");
    if (!canvas) return;
    
    // Set width based on parent container
    const parent = canvas.parentElement;
    let w = parent.offsetWidth || 800;
    let h = Math.max(450, Math.round(w / 1.8)); // Maintain aspect ratio
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    width = w;
    height = h;
    
    // Refresh canvas with new dimensions
    refreshCanvas();
  }
  
  window.addEventListener('resize', resizeNfaCanvas);
  resizeNfaCanvas(); // Initial call

});