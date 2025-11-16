#### Prerequisites

Before we start with this experiment, we recommend the reader gain an understanding of [Determininistic Finite Automata (DFA)](https://virtual-labs.github.io/exp-determinstic-finite-automaton-iiith/). 

<!-- A non-deterministic finite automaton (NFA) is an abstraction of a memory-less machine with transitions that need not be unique. A NFA either accepts or rejects a string by running through a sequence of states that are non-deterministically chosen upon reading the sequence of symbols in the given string. A language of a NFA is the set of all strings that are accepted by it. --->

### Non-deterministic Finite State Automata
Let us recall the following definitions.

A *Deterministic Finite State Machine* (FSM) is a $ 5 $-tuple $ (Q, \Sigma, \delta, q_0, F) $ where
- $ Q $ is a finite set called *states*,
- $ \Sigma $ is a finite set called *alphabet*,
- $ \delta: Q\times \Sigma \rightarrow Q $ is the *transition function*,
- $ q_0 $ is the *start state*, and
- $ F\subseteq Q $ is the set of *accept states*.

For a set $ Q $, let $ \mathcal{P}(Q) $ be the power set of $ Q $. Let us now change this definition slightly to define Non-deterministic Finite State Automaton.

A *Non-Deterministic Finite State Machine* (FSM) is a $ 5 $-tuple $ (Q, \Sigma, \delta, q_0, F) $ where
- $ Q $ is a finite set called *states*,
- $ \Sigma $ is a finite set called *alphabet*,
- $ \delta: Q\times (\Sigma\cup\{\varepsilon\})  \rightarrow \mathcal{P}(Q) $ is the *transition function*,
- $ q_0 $ is the *start state*, and
- $ F\subseteq Q $ is the set of *accept states*.

In other words, in a non-deterministic finite state machine, at any point there may exist zero, one, or several choices for the next state. Non-determinism can be viewed as a generalization of determinism and thus every deterministic finite automaton is a non-deterministic finite automaton.

#### Key Differences Between DFAs and NFAs

It is important to note the following distinctions:

1. **Number of transitions**: In a DFA, from each state, there is exactly one transition for each input symbol. In an NFA, from each state, there can be zero, one, or multiple transitions for a given input symbol.

2. **Epsilon transitions**: NFAs can have transitions labeled with $ \varepsilon $ (epsilon), which represent transitions that can be taken without consuming any input symbol. DFAs do not have epsilon transitions.

3. **Determinism**: Every DFA is also an NFA (a special case where each state has exactly one transition per symbol and no epsilon transitions). However, not every NFA can be directly used as a DFA without conversion.

4. **Variants of NFAs**: NFAs can be categorized based on their properties:
   - NFAs without epsilon transitions (simpler NFAs)
   - NFAs with epsilon transitions ($ \varepsilon $-NFAs)
   - NFAs where every state has at least one transition for each symbol
   - NFAs where some states may have no transitions for certain symbols

#### Example 1
Now let us look at an example of a Non-deterministic Finite State Automaton.

<img src="images/NFAexample1.png" alt="Non-deterministic Finite State Automaton that accepts strings with 101" width="700">
<!-- ![Non-deterministic Finite State Automaton that accepts strings with 101](images/NFAexample1.png) -->

Using the above definition, we can express the automaton in the figure above as follows. $ N= (Q, \Sigma, \delta, q_0, F) $ where
- $ Q = (q_1, q_2, q_3, q_4) $
- $ \Sigma = \{0,1\} $
- $ \delta $ is given by

| | 0 | 1 |
| :--- | :---: | ---:|
| $ q_1 $ | $ q_1 $ | $ \{q_1, q_2\} $ |
| $ q_2 $ | $ q_3 $ | |
| $ q_3 $ |  | $ q_4$|
| $ q_4 $ | $ q_4 $ | $ q_4 $|

- start state $ q_0 $ is $ q_1 $ and
- accept state is $ q_4 $.

Note that the afore mentioned automaton does not have transitions for letter $ 1 $ from state $ q_2 $ and for letter $ 0 $ from states $ q_1 $ and $ q_3 $.


Suppose we are running the NFA on a given string and we reach a state where we have multiple possibilities to proceed. For example, from state $ q_1 $, we have two possibilities, either stay put at $ q_1 $ or transition to $ q_2 $. At this point machine splits into two copies and then explores all possibilities in parallel. Each copy of the machine takes one of the possibilities and continues as before. If there are subsequent choices, the machine splits again. If the next input symbol does not appear on an arrow from the current state in the state diagram (equivalently, if the corresponding cell in the transition table is empty), that copy of the machine dies, along with the branch of computation leading up to it. If any of the copies of the machine is an accept state at the end of the input, the NFA accepts the string.

<img src="images/NFApossibilities.png" alt="Possibilities arising from non-determinism" width="700">
<!-- ![Possibilities arising from non-determinism](images/NFApossibilities.png) -->


Abstractly, non-determinism is parallel computation where several copies of the machine could be running concurrently. Simply put, if any of the sequences of possibilities lead us to an accept state at the end of the input, the machine accepts the string.

Going back to the example above, for a given input of $ 1101 $, the sequence of possible states in a run of the machine that lead to an accept state are $ q_1, q_1, q_2, q_3, q_4 $.

### $\varepsilon$-transitions

In non-deterministic finite state automata, we can have transition arrows labeled by $ \varepsilon $. In presence of $ \varepsilon $s, machine splits into copies, one following each of the $ \varepsilon $-labeled transitions out of the current state, and one copy that stays in the current state.

### Example 2

<img src="images/NFAexample2.png" alt="Non-deterministic Finite State Automaton that accepts strings with 101" width="700">
<!-- ![Non-deterministic Finite State Automaton that accepts strings with 101](images/NFAexample2.png) -->

Formally we get the following. $ N_2= (Q, \Sigma, \delta, q_0, F) $ where
- $ Q = (q_1, q_2, q_3, q_4) $
- $ \Sigma = \{0,1\} $
- $ \delta $ is given by

| | 0 | 1 |$ \varepsilon $|
| :--- | :---: | :---:| ---:|
| $ q_1 $ | $ q_1 $ | $\{q_1, q_2\} $ ||
| $ q_2 $ | $ q_3 $ | |$ q_3 $|
| $ q_3 $ |  | $ q_4 $||
| $ q_4 $ | $ q_4 $ | $ q_4 $||

- start state $ q_0 $ is $ q_1 $ and
- accept state is $ q_4 $.

An equivalent NFA that accepts the same set of strings as the NFA in example 2 is as follows.

<img src="images/NFAexample2a.png" alt="Equivalent NFA to NFA in example 2" width="700">
<!-- ![Equivalent NFA to NFA in example 2](images/NFAexample2a.png) -->

Another equivalent way is as follows.

<img src="images/NFAexample2b.png" alt="Another equivalent NFA to NFA in example 2" width="700">
<!-- ![Another equivalent NFA to NFA in example 2](images/NFAexample2b.png) -->

### NFAs vs DFAs

A natural question that arises is -- are there languages that are accepted by NFAs but not by DFAs? We shall [soon](https://virtual-labs.github.io/exp-nfa-to-dfa-iiith/) see that every language that is accepted by a NFA can also be accepted by a DFA (with a larger number of states).

### Regular languages

A language $ L $ is called a *regular language* if some Finite State Machine *recognizes* it. We shall discuss more about regular languages and regular expressions in the [next experiment](https://virtual-labs.github.io/exp-converting-regular-expression-iiith/).

<!-- ## Related topics -->
<!-- 1. [Language acceptance by Deterministic Finite Automata](https://virtual-labs.github.io/exp-determinstic-finite-automaton-iiith/) -->
<!-- 2. [Converting a NFA to a DFA](https://virtual-labs.github.io/exp-nfa-to-dfa-iiith/) -->
<!-- 3. [Converting a Regular Expression to NFA](https://virtual-labs.github.io/exp-converting-regular-expression-iiith/) -->


