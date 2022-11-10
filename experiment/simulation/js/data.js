/****
  * File containing descriptions of NFA
  *
  */

const nfa1 = {
  "vertices": [
    {"text": "A", "type": "start"},
    {"text": "B", "type": "none"},
    {"text": "C", "type": "none"},
    {"text": "D", "type": "accept"}
  ],
  "edges": [
    {"start": "A", "end": "B", "text": "1", "type": "forward"},
    {"start": "B", "end": "B", "text": "0,1", "type": "self"},
    {"start": "B", "end": "C", "text": "1", "type": "forward"},
    {"start": "C", "end": "C", "text": "0,1", "type": "self"},
    {"start": "C", "end": "B", "text": "0", "type": "backward"},
    {"start": "C", "end": "D", "text": "1", "type": "forward"}
  ],
  "input": [
    {
      "string": "11011",
      "states": ["A", "B", "C", "B", "C", "D"],
      "reject_path": ["A", "B", "B", "B", "C", "C"]
    },
    {
      "string": "100101",
      "states": ["A", "B", "B", "B", "C", "C", "D"],
      "reject_path": ["A", "B", "B", "B", "C", "C", "C"]
    },
    {
      "string": "1010101",
      "states": ["A", "B", "B", "C", "B", "C", "C", "D"],
      "reject_path": ["A", "B", "B", "C", "B", "C", "C", "C"]
    }
  ]
}

const nfa2 = {
  "vertices": [
    {"text": "A", "type": "start"},
    {"text": "B", "type": "none"},
    {"text": "C", "type": "none"},
    {"text": "D", "type": "accept"}
  ],
  "edges": [
    {"start": "A", "end": "B", "text": "1", "type": "forward"},
    {"start": "B", "end": "A", "text": "0", "type": "backward"},
    {"start": "B", "end": "C", "text": "0", "type": "forward"},
    {"start": "C", "end": "C", "text": "0,1", "type": "self"},
    {"start": "C", "end": "D", "text": "1", "type": "forward"}
  ],
  "input": [
    {
      "string": "101011",
      "states": ["A", "B", "A", "B", "C", "C", "D"],
      "reject_path": ["A", "B", "A", "B", "C", "C", "C"]
    },
    {
      "string": "10111",
      "states": ["A", "B", "C", "C", "C", "D"],
      "reject_path": ["A", "B", "C", "C", "C", "C"]
    },
    {
      "string": "10011",
      "states": ["A", "B", "C", "C", "C", "D"],
      "reject_path": ["A", "B", "C", "C", "C", "C"]
    }
  ]
}

const nfa3 = {
  "vertices": [
    {"text": "A", "type": "start"},
    {"text": "B", "type": "none"},
    {"text": "C", "type": "none"},
    {"text": "D", "type": "accept"}
  ],
  "edges": [
    {"start": "A", "end": "A", "text": "0,1", "type": "self"},
    {"start": "A", "end": "B", "text": "1", "type": "forward"},
    {"start": "B", "end": "C", "text": "0", "type": "forward"},
    {"start": "C", "end": "D", "text": "1", "type": "forward"},
    {"start": "D", "end": "D", "text": "0,1", "type": "self"}
  ],
  "input": [
    {
      "string": "010110",
      "states": ["A", "A", "B", "C", "D", "D", "D"],
      "reject_path": ["A", "A", "A", "A", "A", "B", "C"]
    },
    {
      "string": "1011111",
      "states": ["A", "B", "C", "D", "D", "D", "D", "D"],
      "reject_path": ["A", "A", "A", "B", "B", "B", "B", "B"]
    },
    {
      "string": "001101111",
      "states": ["A", "A", "A", "A", "B", "C", "D", "D", "D", "D"],
      "reject_path": ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A"]
    }
  ]
}

const nfa4 = {
  "vertices": [
    {"text": "A", "type": "start"},
    {"text": "B", "type": "none"},
    {"text": "C", "type": "accept"}
  ],
  "edges": [
    {"start": "A", "end": "A", "text": "0,1", "type": "self"},
    {"start": "A", "end": "B", "text": "1", "type": "forward"},
    {"start": "B", "end": "C", "text": "0,1", "type": "forward"}
  ],
  "input": [
    {
      "string": "11010",
      "states": ["A", "A", "A", "A", "B", "C"],
      "reject_path": ["A", "A", "A", "A", "A", "A"]
    },
    {
      "string": "1111",
      "states": ["A", "A", "A", "B", "C"],
      "reject_path": ["A", "A", "A", "A", "B"]
    },
    {
      "string": "0011011",
      "states": ["A", "A", "A", "A", "A", "A", "B", "C"],
      "reject_path": ["A", "A", "A", "A", "A", "A", "A", "B"]
    }
  ]
}

const nfa5 = {
  "vertices": [
    {"text": "A", "type": "start"},
    {"text": "B", "type": "none"},
    {"text": "C", "type": "none"},
    {"text": "D", "type": "none"},
    {"text": "E", "type": "accept"}
  ],
  "edges": [
    {"start": "A", "end": "B", "text": "1", "type": "forward"},
    {"start": "B", "end": "B", "text": "0,1", "type": "self"},
    {"start": "B", "end": "C", "text": "0", "type": "forward"},
    {"start": "C", "end": "D", "text": "0", "type": "forward"},
    {"start": "D", "end": "D", "text": "0,1", "type": "self"},
    {"start": "D", "end": "E", "text": "1", "type": "forward"}
  ],
  "input": [
    {
      "string": "1001",
      "states": ["A", "B", "C", "D", "E"],
      "reject_path": ["A", "B", "C", "D", "D"]
    },
    {
      "string": "100011",
      "states": ["A", "B", "B", "C", "D", "D", "E"],
      "reject_path": ["A", "B", "B", "C", "D", "D", "D"]
    },
    {
      "string": "11001",
      "states": ["A", "B", "B", "C", "D", "E"],
      "reject_path": ["A", "B", "B", "C", "D", "D"]
    }
  ]
}
