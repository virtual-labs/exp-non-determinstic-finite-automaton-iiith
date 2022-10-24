
const nfa1 = {
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
      "states": ["A", "A", "B", "C", "D", "D", "D"]
    },
    {
      "string": "1011111",
      "states": ["A", "B", "C", "D", "D", "D", "D", "D"]
    },
    {
      "string": "001101111",
      "states": ["A", "A", "A", "A", "B", "C", "D", "D", "D", "D"]
    }
  ]
}

const nfa2 = {
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
      "states": ["A", "A", "A", "A", "B", "C"]
    },
    {
      "string": "1111",
      "states": ["A", "A", "A", "B", "C"]
    },
    {
      "string": "0011011",
      "states": ["A", "A", "A", "A", "A", "A", "B", "C"]
    }
  ]
}

const nfa3 = {
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
      "states": ["A", "B", "C", "D", "E"]
    },
    {
      "string": "100011",
      "states": ["A", "B", "B", "C", "D", "D", "E"]
    },
    {
      "string": "11001",
      "states": ["A", "B", "B", "C", "D", "E"]
    }
  ]
}
