## Understanding the Simulation Interface

The simulation presents three key components that work together to demonstrate NFA behavior:

### 1. Quick Guide Panel

At the top of the simulation, you will find a compact quick guide that outlines the four essential steps for using the simulation effectively. This visual guide serves as your roadmap throughout the experiment.

### 2. Input String and State Diagram Panel

This central panel displays two crucial elements:

- **Input String Display**: Shows the current input string with character-by-character highlighting
- **State Diagram**: Visual representation of the selected NFA with states, transitions, and labels

### 3. Execution Trace Panel

Located on the right side, this panel provides a detailed log of the NFA's execution, showing all possible computational paths and their outcomes.

## Step-by-Step Procedure

### Step 1: Select a Non-deterministic Finite Automaton

Begin your exploration by choosing an NFA to work with:

1. Locate the **"Change NFA"** button in the input controls section
2. Click this button to access the available NFA options
3. Browse through the different NFAs, each designed to demonstrate specific aspects of non-deterministic computation
4. Select an NFA that interests you or start with the first option if you are a beginner
5. Observe how the state diagram updates to display your chosen NFA's structure

The state diagram will show:

- **States**: Represented as circles, with the initial state clearly marked
- **Final States**: Indicated by double circles
- **Transitions**: Arrows between states labeled with input symbols
- **Epsilon Transitions**: Special transitions that can occur without consuming input

### Step 2: Choose an Input String

Select a string to test against your chosen NFA:

1. Click the **"Change Input"** button to access input string options
2. Choose from the predefined input strings, which are carefully selected to demonstrate various NFA behaviors
3. Alternatively, you may have the option to enter a custom string (if available)
4. Notice how the selected string appears in the input display area with clear character separation

The input string will be displayed with:

- Each character clearly separated for easy tracking
- The current character position highlighted during execution
- Proper formatting to handle both short and long strings

### Step 3: Execute Step-by-Step Processing

This is where the real learning begins. Process your input string character by character:

1. **Start the Execution**: Click the **"Next Step"** button to begin processing
2. **Observe State Transitions**: Watch as the NFA processes each character
   - The current character being processed will be highlighted in yellow
   - Multiple states may become active simultaneously due to non-determinism
   - Epsilon transitions may occur automatically between regular input characters

3. **Follow the Execution Trace**: Monitor the trace panel on the right, which will show:
   - Current active states
   - The character being processed
   - All possible transition paths
   - Which paths lead to acceptance or rejection

4. **Navigate Through the Process**:
   - Use **"Next Step"** to advance through the input string
   - Use **"Previous"** to step backward and review earlier stages
   - Take your time to understand each transition before proceeding

### Step 4: Analyze the Results

Upon completing the string processing:

1. **Observe the Final Outcome**: The simulation will clearly indicate whether the string is accepted or rejected
2. **Understanding Acceptance**: A string is accepted if at least one computational path ends in a final state
3. **Understanding Rejection**: A string is rejected only if all possible computational paths fail to reach a final state
4. **Review the Complete Trace**: Examine the execution trace to understand all the paths that were explored